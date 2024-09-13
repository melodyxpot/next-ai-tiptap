import React, { KeyboardEvent, useState } from "react";
import { Sparkle } from "lucide-react";
import { useAITooltipContext } from "@/contexts/AITooltipProvider";
import { iconClassName } from "./ListSelection";

export default function Input({
	handleOptionChoose
}: {
	handleOptionChoose: (_v: string, _o: AITask) => void;
}) {
	const { loading } = useAITooltipContext();
	const [prompt, setPrompt] = useState<string>("");

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleOptionChoose(prompt, AITask.Custom);
		}
	};

	return (
		<div
			className={`w-full pl-3 py-2 flex gap-1 justify-between items-center ${loading ? "bg-gray-100" : ""}`}
		>
			<input
				type="text"
				value={prompt}
				placeholder={loading ? "Writing..." : "Enter custom prompt..."}
				onChange={e => setPrompt(e.currentTarget.value)}
				onKeyDown={handleInputKeyDown}
				className="w-full text-sm focus:outline-none outline-none"
				disabled={loading}
			/>
			<Sparkle className={`${iconClassName}`} />
		</div>
	);
}
