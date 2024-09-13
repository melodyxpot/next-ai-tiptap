import { Extension, Mark, Node, getMarkType } from "@tiptap/core";
import { ReactNodeViewRenderer, findChildren } from "@tiptap/react";
import { CompletionPreview } from "./CompletionPreview";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		selectionHighlight: {
			setSelectionHighlight: (from: number, to: number) => ReturnType;
			unsetSelectionHighlight: () => ReturnType;
		};

		textReplacement: {
			previewText: (text: string) => ReturnType;
			revertText: () => ReturnType;
			setText: (text: string) => ReturnType;
		};

		completion: {
			previewCompletion: (text: string) => ReturnType;
			confirmCompletion: () => ReturnType;
			revertCompletion: () => ReturnType;
		};
	}
}

export const TextReplacementExtension = Extension.create({
	name: "textReplacement",
	addCommands() {
		let originalText: string = "";
		// let replacedText: string = "";

		return {
			setText:
				(text: string) =>
				({ tr, state, chain }) => {
					tr.replaceSelectionWith(tr.doc.type.schema.text(text));
					chain()
						.setTextSelection({
							from: state.selection.from,
							to: state.selection.from + text.length
						})
						.setMeta("isSystemAction", true)
						.run();

					return true;
				},
			previewText:
				(text: string) =>
				({ tr, state, commands }) => {
					originalText = tr.doc.textBetween(
						state.selection.from,
						state.selection.to,
						"\n"
					);

					// replacedText = text;

					commands.setText(text);

					return true;
				},
			revertText:
				() =>
				({ tr, state, chain }) => {
					tr.replaceSelectionWith(tr.doc.type.schema.text(originalText));
					chain()
						.setTextSelection({
							from: state.selection.from,
							to: state.selection.from + originalText.length
						})
						.setMeta("isSystemAction", true)
						.run();

					originalText = "";
					// replacedText = "";

					return true;
				}
		};
	}
});

export const CompletionExtension = Extension.create({
	name: "completion",
	addKeyboardShortcuts() {
		return {
			Tab: () => {
				return this.editor.commands.confirmCompletion();
			},
			Backspace: ({ editor }) => {
				const { selection } = editor.state;

				if (
					selection.$anchor.nodeAfter?.marks.some(
						mark => mark.type.name === "previewCompletion"
					)
				) {
					editor
						.chain()
						.deleteRange({
							from: selection.$anchor.pos,
							to: selection.$anchor.pos + selection.$anchor.nodeAfter.nodeSize
						})

						.run();
				}

				return false;
			}
		};
	},
	addCommands() {
		const completionPosition = { from: 0, to: 0 };
		return {
			previewCompletion:
				(text: string) =>
				({ state, chain }) => {
					if (text.length > 0) {
						chain()
							.insertContentAt(state.selection.to, {
								type: "previewCompletion",
								content: [
									{
										type: "text",
										text
									}
								]
							})
							.setTextSelection(state.selection.to)
							.setMeta("isSystemAction", true)
							.run();
					}

					return true;
				},
			confirmCompletion:
				() =>
				({ state, chain }) => {
					const nodes = findChildren(state.doc, node => {
						return node.type.name === "previewCompletion";
					});

					if (nodes.length > 0) {
						// convert nodes to text
						const text = nodes.map(node => node.node.textContent).join("");
						// insert text
						chain()
							.deleteRange({
								from: nodes[0].pos,
								to:
									nodes[nodes.length - 1].pos +
									nodes[nodes.length - 1].node.nodeSize
							})
							.insertContentAt(state.selection.to, {
								type: "text",
								text
							})
							.setTextSelection(state.selection.to + text.length)
							.setMeta("isSystemAction", true)
							.run();
					}

					return true;
				},
			revertCompletion:
				() =>
				({ tr, state }) => {
					const nodes = findChildren(state.doc, node => {
						return node.type.name === "previewCompletion";
					});

					nodes.forEach(node => {
						tr.delete(node.pos, node.pos + node.node.nodeSize);
					});

					completionPosition.from = 0;
					completionPosition.to = 0;

					return true;
				}
		};
	}
});

export const PreviewCompletionNode = Node.create({
	name: "previewCompletion",
	group: "inline",
	content: "inline*",
	inline: true,
	addNodeView() {
		return ReactNodeViewRenderer(CompletionPreview);
	}
});

export const SelectionHighlightMark = Mark.create({
	name: "selectionHighlight",

	addCommands() {
		let marks: { from: number; to: number }[] = [];
		console.log("[marks]", marks);

		return {
			setSelectionHighlight:
				(from: number, to: number) =>
				({ tr, state }) => {
					const type = getMarkType("selectionHighlight", state.schema);
					tr.addMark(from, to, type.create());

					marks.push({ from, to });

					return true;
				},
			unsetSelectionHighlight:
				() =>
				({ tr, state }) => {
					marks.forEach(mark => {
						try {
							tr.removeMark(
								mark.from,
								mark.to,
								getMarkType("selectionHighlight", state.schema)
							);
						} catch (e) {}
					});
					marks = [];
					return true;
				}
		};
	},

	renderHTML() {
		return ["span", { class: "bg-violet-100 rounded-sm" }, 0];
	}
});
