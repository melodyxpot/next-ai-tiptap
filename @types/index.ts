export enum AITask {
	Translate = "translate",
	Improve = "improve",
	FixMistakes = "fixMistakes",
	Simplify = "simplify",
	Summarize = "summarize",
	ChangeStyle = "changeStyle"
}

export interface SelectionContext {
	before: string;
	selection: string;
	after: string;
	selectionStart: number;
	selectionEnd: number;
}
