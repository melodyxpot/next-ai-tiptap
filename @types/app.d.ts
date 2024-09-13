enum AITask {
	Translate = "translate",
	Improve = "improve",
	FixMistakes = "fixMistakes",
	Simplify = "simplify",
	Summarize = "summarize",
	ChangeStyle = "changeStyle",
	Regenerate = "regenerate",
	Custom = "custom"
}

declare type PopupState = "main" | "language" | "style" | "result";

declare type AITextStyle =
	| "Professional"
	| "Straignforward"
	| "Friendly"
	| "Confident"
	| "Fun";

declare type Language =
	| "Arabic"
	| "Bengali"
	| "Chinese"
	| "Dutch"
	| "English"
	| "French"
	| "German"
	| "Hindi"
	| "Japanese"
	| "Korean"
	| "Nepali"
	| "Portuguese"
	| "Spanish";

interface Position {
	x: number;
	y: number;
}

interface AIButtonProps {
	onClick: (_e: React.MouseEvent) => void;
	position: Position;
}

interface FeaturePopupProps {
	_onClose: () => void;
	onOptionSelect: (_option: AITask, _v?: string) => void;
	position: Position;
	replaceSelectedText: () => void;
	hideToolbar: () => void;
	visibleState: PopupState;
	setVisibleState: React.Dispatch<React.SetStateAction<PopupState>>;
}

interface ResultProps {
	result: string;
	onClose: () => void;
	onAction: (_action: "replace" | "regenerate") => void;
	position: Position;
}
