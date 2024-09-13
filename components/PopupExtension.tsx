import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

const PopupExtension = (
	onTextSelected: (_text: string | null, _position: Position) => void
) => {
	return Extension.create({
		name: "aiPopup",
		addProseMirrorPlugins() {
			return [
				new Plugin({
					key: new PluginKey("aiPopup"),
					view: () => ({
						update: view => {
							const { state } = view;
							const { selection } = state;
							const text = state.doc.textBetween(selection.from, selection.to);
							if (text) {
								const { from, to } = selection;
								const start = view.coordsAtPos(from);
								const end = view.coordsAtPos(to);
								onTextSelected(text, {
									x: (start.left + end.right) / 2,
									y: end.bottom
								});
							} else {
								onTextSelected(null, { x: 0, y: 0 });
							}
						}
					})
				})
			];
		}
	});
};

export default PopupExtension;
