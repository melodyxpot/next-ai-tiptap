"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AnimatePresence } from "framer-motion";
import { CONTEXT } from "@/constants";
import AIButton from "./AIButton";
import FeaturePopup from "./FeaturePopup";
import PopupExtension from "./PopupExtension";
import ResultPopup from "./ResultPopup";

export default function AIEditor() {
	const [selectedText, setSelectedText] = useState<string | null>(null);
	const [showFeaturePopup, setShowFeaturePopup] = useState(false);
	const [showResultPopup, setShowResultPopup] = useState(false);
	const [aiResult, setAIResult] = useState("");
	const [popupPosition, setPopupPosition] = useState<Position>({ x: 0, y: 0 });
	const editorRef = useRef<HTMLDivElement>(null);

	const handleHighlight = useCallback(
		(text: string | null, position: Position) => {
			if (text && !showFeaturePopup) {
				setSelectedText(text);
				// setPopupPosition(position);
				// showFeaturePopup(false);
				// showResultPopup(false);
			} else {
				setSelectedText(null);
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

	const handleOptionSelect = (option: string) => {
		console.log("[handleOptionSelect]");
		setShowFeaturePopup(false);
		// Simulate AI processing
		setTimeout(() => {
			setAIResult(`AI-generated result for "${option}" on "${selectedText}"`);
			setShowResultPopup(true);
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
					<FeaturePopup
						_onClose={() => setShowFeaturePopup(false)}
						onOptionSelect={handleOptionSelect}
						position={popupPosition}
					/>
				)}
				{showResultPopup && (
					<ResultPopup
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
