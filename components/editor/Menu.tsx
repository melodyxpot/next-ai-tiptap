"use client";

import React, { useState } from "react";
import { posToDOMRect, useCurrentEditor } from "@tiptap/react";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import { SelectionContext } from "@/@types";
import { Popup } from "./Popup";
import { Suggestions } from "./Suggestions";

interface MenuProps {
	suggestions: string[];
	context: SelectionContext | null;
	status: "idle" | "fetching" | "done";
}

export const Menu = ({ suggestions, context, status }: MenuProps) => {
	const { editor } = useCurrentEditor();

	const lastRect = React.useRef<DOMRect | null>(null);
	const [popupOpen, setPopupOpen] = useState<boolean>(false);

	const rect = React.useMemo(() => {
		if (!editor || status === "done") {
			return lastRect.current;
		}

		const rect = posToDOMRect(
			editor.view,
			editor.state.selection.from,
			editor.state.selection.to
		);

		const editorRect = editor.view.dom.getBoundingClientRect();

		rect.y -= editorRect.y;
		rect.x -= editorRect.x;

		lastRect.current = rect;

		return rect;
	}, [
		status,
		editor?.view,
		editor?.state.selection.from,
		editor?.state.selection.to
	]);

	if (!editor || editor.isDestroyed) {
		return null;
	}
	console.log("[status]", status);
	console.log("[popupOpen]", popupOpen);

	return (
		<Popup rect={rect} visible={status !== "idle"}>
			<div className="flex flex-col gap-2">
				<motion.div
					className="flex flex-row items-center gap-1 text-violet-500 cursor-pointer"
					onClick={() => setPopupOpen(true)}
				>
					<p className="text-sm font-semibold">AI</p>
					<SparklesIcon className="w-4 h-4" />
				</motion.div>
				<Suggestions
					isLoading={status === "fetching" || status === "idle"}
					suggestions={suggestions}
					context={context}
				/>
			</div>
		</Popup>
	);
};
