export enum AITask {
	Translate = "translate",
	Improve = "improve",
	FixMistakes = "fixMistakes",
	Simplify = "simplify",
	Summarize = "summarize",
	ChangeStyle = "changeStyle",
	Regenerate = "regenerate",
	Custom = "custom"
}

export interface SelectionContext {
	before: string;
	selection: string;
	after: string;
	selectionStart: number;
	selectionEnd: number;
}
