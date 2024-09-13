// declare type AITask = 'translate' | 'improve' | 'fixMistakes' | 'simplify' | 'summarize' | 'changeStyle';

declare type AITextStyle =
	| "Professional"
	| "Straignforward"
	| "Friendly"
	| "Confident"
	| "Fun";

declare type languages =
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
	onOptionSelect: (_option: string) => void;
	position: Position;
}

interface ResultProps {
	result: string;
	onClose: () => void;
	onAction: (_action: "replace" | "regenerate") => void;
	position: Position;
}
