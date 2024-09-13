"use client";

import { useEffect, useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { caseAITasks } from "@/actions/generate";
import { AITask } from "@/types";

export default function EditorComponent() {
	const [selectedText, setSelectedText] = useState<string>("");
	const [generation, setGeneration] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setSelectedText("Hello World!");
	}, []);

	// Function to stream AI response
	const handleAITask = async (
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

	return (
		<div>
			<div className="flex flex-col gap-3">
				<button onClick={() => handleAITask(AITask.Translate)}>
					Translate
				</button>
				<button onClick={() => handleAITask(AITask.Improve)}>
					Improve Writing
				</button>
				<button onClick={() => handleAITask(AITask.FixMistakes)}>
					Fix Mistakes
				</button>
				<button onClick={() => handleAITask(AITask.Simplify)}>Simplify</button>
				<button onClick={() => handleAITask(AITask.Summarize)}>
					Summarize
				</button>
				<button
					onClick={() => handleAITask(AITask.ChangeStyle, "Professional")}
				>
					Professional Style
				</button>
				<button onClick={() => handleAITask(AITask.ChangeStyle, "Friendly")}>
					Friendly Style
				</button>
			</div>

			{loading && <p>Loading...</p>}

			<div>
				<h2>Streamed Response:</h2>
				<p>{generation}</p>
			</div>
		</div>
	);
}
