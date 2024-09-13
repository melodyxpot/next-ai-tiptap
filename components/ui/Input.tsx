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
		<input
			type="text"
			value={prompt}
			placeholder="Enter custom prompt..."
			onChange={e => setPrompt(e.currentTarget.value)}
			onKeyDown={handleInputKeyDown}
			className="w-full px-3 py-2 text-sm focus:outline-none outline-none"
		/>
	);
}
