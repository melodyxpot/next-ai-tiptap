"use client";

import { useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { AITask } from "@/@types";
import { caseAITasks } from "@/actions/generate";

export default function useAITooltip() {
	const [selectedText, setSelectedText] = useState<string>("");
	const [generation, setGeneration] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	// Function to stream AI response
	const handleSubmitAI = async (
		task: AITask,
		style?: AITextStyle
	): Promise<void> => {
		setLoading(true);
		setGeneration(""); // Clear previous output

		try {
			const { output } = await caseAITasks(selectedText, task, style);
			if (output) {
				for await (const delta of readStreamableValue(output)) {
					setGeneration(currentGeneration => `${currentGeneration}${delta}`);
				}
			}
		} catch (error) {
			console.error("Error streaming:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		generation,
		setSelectedText,
		selectedText,
		handleSubmitAI
	};
}
