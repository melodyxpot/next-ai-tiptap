"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AnimatePresence } from "framer-motion";
import { AITask } from "@/@types";
import { CONTEXT } from "@/constants";
import { useAITooltipContext } from "@/contexts/AITooltipProvider";
import AIButton from "./AIButton";
import HighlightToolbar from "./HighlightToolbar";
import PopupExtension from "./PopupExtension";
import ResultPopup from "./ResultPopup";

export default function AIEditor() {
	const { selectedText, setSelectedText, handleSubmitAI, generation } =
		useAITooltipContext();

	const [showFeaturePopup, setShowFeaturePopup] = useState<boolean>(false);
	const [showResultPopup, setShowResultPopup] = useState<boolean>(false);
	const [popupPosition, setPopupPosition] = useState<Position>({ x: 0, y: 0 });
	const editorRef = useRef<HTMLDivElement>(null);

	const handleHighlight = useCallback(
		(text: string | null, position: Position) => {
			if (text && !showFeaturePopup) {
				setSelectedText(text);
				setPopupPosition(position);
				// setShowFeaturePopup(false);
				// setShowResultPopup(false);
			} else {
				setSelectedText("");
			}
		},
		[]
	);

	const editor = useEditor({
		extensions: [StarterKit, PopupExtension(handleHighlight)],
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
		setShowFeaturePopup(true);
	};

	const handleOptionSelect = (option: AITask, v?: string) => {
		setShowFeaturePopup(false);
		handleSubmitAI(option, v);
		setShowResultPopup(true);
	};

	const handleAIAction = (action: "replace" | "regenerate") => {
		if (action === "replace" && editor) {
			editor.commands.setTextSelection({
				from: editor.state.selection.from,
				to: editor.state.selection.to
			});
			editor.commands.insertContent(generation);
		} else if (action === "regenerate") {
			// // Simulate regeneration
			// setTimeout(() => {
			// 	setAIResult(`Regenerated AI result for "${selectedText}"`);
			// }, 1000);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				editorRef.current &&
				!editorRef.current.contains(event.target as Node)
			) {
				setSelectedText("");
				setShowFeaturePopup(false);
				setShowResultPopup(false);
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
				{selectedText !== "" && !showFeaturePopup && !showResultPopup && (
					<AIButton onClick={handleAIButtonClick} position={popupPosition} />
				)}
				{showFeaturePopup && (
					<HighlightToolbar
						_onClose={() => setShowFeaturePopup(false)}
						onOptionSelect={handleOptionSelect}
						position={popupPosition}
					/>
				)}
				{showResultPopup && (
					<ResultPopup
						result={generation}
						onClose={() => setShowResultPopup(false)}
						onAction={handleAIAction}
						position={popupPosition}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
