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
import ToolbarExtension from "./ToolbarExtension";

export default function AIEditor() {
	const { selectedText, setSelectedText, handleSubmitAI, generation } =
		useAITooltipContext();

	const [showToolbar, setShowToolbar] = useState<boolean>(false);
	const [popupPosition, setPopupPosition] = useState<Position>({ x: 0, y: 0 });
	const editorRef = useRef<HTMLDivElement>(null);

	const handleHighlight = useCallback(
		(text: string | null, position: Position) => {
			if (text && !showToolbar) {
				setSelectedText(text);
				setPopupPosition(position);
				// setShowToolbar(false);
			} else {
				setSelectedText("");
			}
		},
		[]
	);

	const editor = useEditor({
		extensions: [StarterKit, ToolbarExtension(handleHighlight)],
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
		setShowToolbar(true);
	};

	const handleOptionSelect = (option: AITask, v?: string) => {
		setShowToolbar(false);
		handleSubmitAI(option, v);
	};

	const replaceSelectedText = () => {
		if (editor) {
			editor.commands.setTextSelection({
				from: editor.state.selection.from,
				to: editor.state.selection.to
			});
			editor.commands.insertContent(generation);
		}
	};

	const hideToolbar = () => {
		setSelectedText("");
		setShowToolbar(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				editorRef.current &&
				!editorRef.current.contains(event.target as Node)
			) {
				hideToolbar();
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
				{selectedText !== "" && !showToolbar && (
					<AIButton onClick={handleAIButtonClick} position={popupPosition} />
				)}
				{showToolbar && (
					<HighlightToolbar
						_onClose={() => setShowToolbar(false)}
						onOptionSelect={handleOptionSelect}
						replaceSelectedText={replaceSelectedText}
						position={popupPosition}
						hideToolbar={hideToolbar}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
