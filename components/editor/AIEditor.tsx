"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Extension } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronDown,
	Copy,
	List,
	Play,
	RotateCcw,
	Sparkles,
	X
} from "lucide-react";
import { Plugin, PluginKey } from "prosemirror-state";
import { CONTEXT } from "@/constants";

interface Position {
	x: number;
	y: number;
}

interface AIButtonProps {
	onClick: (_e: React.MouseEvent) => void;
	position: Position;
}

interface AIPopupProps {
	_onClose: () => void;
	onOptionSelect: (_option: string) => void;
	position: Position;
}

interface AIResultProps {
	result: string;
	onClose: () => void;
	onAction: (_action: "replace" | "regenerate") => void;
	position: Position;
}

const AIPopupExtension = (
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

const AIButton: React.FC<AIButtonProps> = ({ onClick, position }) => (
	<motion.div
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: 10 }}
		transition={{ duration: 0.2 }}
		className="fixed z-10"
		style={{
			top: position.y,
			left: position.x,
			transform: "translate(-50%, 0)"
		}}
	>
		<button
			onClick={onClick}
			className="flex items-center space-x-1 bg-white border border-gray-200 rounded-md shadow-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<Sparkles className="w-4 h-4 text-indigo-500" />
			<span>AI</span>
		</button>
	</motion.div>
);

const AIPopup: React.FC<AIPopupProps> = ({
	_onClose,
	onOptionSelect,
	position
}) => (
	<motion.div
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: 10 }}
		transition={{ duration: 0.2 }}
		className="fixed z-20 w-64 bg-white border border-gray-200 rounded-lg shadow-xl"
		style={{
			top: position.y,
			left: position.x,
			transform: "translate(-50%, 8px)"
		}}
	>
		<div className="p-2 space-y-1">
			<input
				type="text"
				placeholder="Enter custom prompt..."
				className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
			/>
			<button
				onClick={() => onOptionSelect("Modify selection")}
				className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-md"
			>
				<ChevronDown className="w-4 h-4 mr-2" />
				Modify selection
			</button>
		</div>
		<div className="border-t border-gray-200">
			<button
				onClick={() => onOptionSelect("Improve writing")}
				className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
			>
				<Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
				Improve writing
			</button>
			<button
				onClick={() => onOptionSelect("Fix mistakes")}
				className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
			>
				<Copy className="w-4 h-4 mr-2 text-indigo-500" />
				Fix mistakes
			</button>
			<button
				onClick={() => onOptionSelect("Simplify")}
				className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
			>
				<Play className="w-4 h-4 mr-2 text-indigo-500" />
				Simplify
			</button>
		</div>
		<div className="border-t border-gray-200 p-2">
			<button
				onClick={() => onOptionSelect("Summarise")}
				className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-md"
			>
				<List className="w-4 h-4 mr-2 text-indigo-500" />
				Summarise
			</button>
		</div>
	</motion.div>
);

const AIResult: React.FC<AIResultProps> = ({
	result,
	onClose,
	onAction,
	position
}) => (
	<motion.div
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: 10 }}
		transition={{ duration: 0.2 }}
		className="fixed z-30 w-80 bg-white border border-gray-200 rounded-lg shadow-xl"
		style={{
			top: position.y,
			left: position.x,
			transform: "translate(-50%, 8px)"
		}}
	>
		<div className="p-4">
			<div className="flex justify-between items-center mb-2">
				<h3 className="text-sm font-medium text-gray-900">AI Suggestion</h3>
				<button onClick={onClose} className="text-gray-400 hover:text-gray-500">
					<X className="w-4 h-4" />
				</button>
			</div>
			<p className="text-sm text-gray-600 mb-4">{result}</p>
			<div className="flex space-x-2">
				<button
					onClick={() => onAction("replace")}
					className="flex-1 bg-indigo-600 text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Replace selection
				</button>
				<button
					onClick={() => onAction("regenerate")}
					className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<RotateCcw className="w-5 h-5 text-gray-400" />
				</button>
			</div>
		</div>
	</motion.div>
);

export default function AIEditor() {
	const [selectedText, setSelectedText] = useState<string | null>(null);
	const [showAIPopup, setShowAIPopup] = useState(false);
	const [showAIResult, setShowAIResult] = useState(false);
	const [aiResult, setAIResult] = useState("");
	const [popupPosition, setPopupPosition] = useState<Position>({ x: 0, y: 0 });
	const editorRef = useRef<HTMLDivElement>(null);

	const handleHighlight = useCallback(
		(text: string | null, position: Position) => {
			if (text && !showAIPopup) {
				setSelectedText(text);
				// setPopupPosition(position);
				// setShowAIPopup(false);
				// setShowAIResult(false);
			} else {
				setSelectedText(null);
			}
		},
		[]
	);

	const editor = useEditor({
		extensions: [StarterKit, AIPopupExtension(handleHighlight)],
		content: `<p>${CONTEXT}</p>`,
		editorProps: {
			attributes: {
				class:
					"prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none"
			}
		},
		immediatelyRender: false
	});

	const handleAIButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowAIPopup(true);
	};

	const handleOptionSelect = (option: string) => {
		console.log("[handleOptionSelect]");
		setShowAIPopup(false);
		// Simulate AI processing
		setTimeout(() => {
			setAIResult(`AI-generated result for "${option}" on "${selectedText}"`);
			setShowAIResult(true);
		}, 1000);
	};

	const handleAIAction = (action: "replace" | "regenerate") => {
		if (action === "replace" && editor) {
			editor.commands.setTextSelection({
				from: editor.state.selection.from,
				to: editor.state.selection.to
			});
			editor.commands.insertContent(aiResult);
		} else if (action === "regenerate") {
			// Simulate regeneration
			setTimeout(() => {
				setAIResult(`Regenerated AI result for "${selectedText}"`);
			}, 1000);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				editorRef.current &&
				!editorRef.current.contains(event.target as Node)
			) {
				console.log("union");
				setSelectedText("");
				setShowAIPopup(false);
				setShowAIResult(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative max-w-3xl mx-auto mt-8 p-4" ref={editorRef}>
			<EditorContent editor={editor} />
			<AnimatePresence>
				{selectedText !== "" && !showAIPopup && !showAIResult && (
					<AIButton onClick={handleAIButtonClick} position={popupPosition} />
				)}
				{showAIPopup && (
					<AIPopup
						_onClose={() => setShowAIPopup(false)}
						onOptionSelect={handleOptionSelect}
						position={popupPosition}
					/>
				)}
				{showAIResult && (
					<AIResult
						result={aiResult}
						onClose={() => console.log("hello world")}
						onAction={handleAIAction}
						position={popupPosition}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
