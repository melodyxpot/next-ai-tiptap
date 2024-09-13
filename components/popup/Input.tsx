import React, { KeyboardEvent, useState } from "react";

export default function Input({
	handleOptionChoose
}: {
	handleOptionChoose: (_v: string, _o: AITask) => void;
}) {
	const [prompt, setPrompt] = useState<string>("");

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleOptionChoose(prompt, AITask.Custom);
		}
	};

	return (
		<div className="space-y-1 bg-white border border-gray-200 rounded-lg shadow-xl p-1 mb-2 w-full">
			<input
				type="text"
				value={prompt}
				placeholder="Enter custom prompt..."
				onChange={e => setPrompt(e.currentTarget.value)}
				onKeyDown={handleInputKeyDown}
				className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
			/>
		</div>
	);
}
