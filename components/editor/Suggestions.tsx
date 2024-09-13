import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { useUnmount } from "react-use";
import { SelectionContext } from "@/types";
import { Spinner } from "../icons/Spinner";

interface PopupChildrenProps {
	isLoading: boolean;
	suggestions: string[];
	context: SelectionContext | null;
}

export const Suggestions = ({ isLoading, suggestions }: PopupChildrenProps) => {
	const { editor } = useCurrentEditor();

	const originalTextRef = React.useRef<string | null>(null);

	const showTempText = React.useCallback(
		(text: string) => {
			editor?.commands.previewText(text);
		},
		[editor]
	);

	const revertText = React.useCallback(() => {
		editor?.commands.revertText();
	}, [editor]);

	useUnmount(() => {
		if (originalTextRef.current) {
			revertText();
		}
	});

	if (isLoading) {
		return <Spinner />;
	}

	if (suggestions.length > 0) {
		return (
			<>
				{suggestions.map((suggestion, index) => (
					<div
						key={index}
						className="py-1 px-2 cursor-pointer hover:bg-gray-100 rounded text-xs pointer-events-auto select-none"
						onMouseEnter={() => showTempText(suggestion)}
						onMouseLeave={revertText}
						onClick={e => {
							e.preventDefault();
							e.stopPropagation();

							editor?.commands.setText(suggestion);
						}}
					>
						{suggestion.replace("\n", "<br>")}
					</div>
				))}
			</>
		);
	}

	return (
		<span className="text-xs text-gray-400 whitespace-nowrap">
			No suggestions found.
		</span>
	);
};
