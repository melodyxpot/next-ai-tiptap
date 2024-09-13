enum AITask {
	Translate = "translate",
	Improve = "improve",
	FixMistakes = "fixMistakes",
	Simplify = "simplify",
	Summarize = "summarize",
	ChangeStyle = "changeStyle"
}

declare type AITextStyle =
	| "Professional"
	| "Straignforward"
	| "Friendly"
	| "Confident"
	| "Fun";

declare type Languages =
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
	onOptionSelect: (_option: AITask) => void;
	position: Position;
}

interface ResultProps {
	result: string;
	onClose: () => void;
	onAction: (_action: "replace" | "regenerate") => void;
	position: Position;
}
