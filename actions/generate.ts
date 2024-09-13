"use server";

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { AITask } from "@/@types";
import { basicPrompt } from "@/constants";

export async function generate(input: string) {
	const stream = createStreamableValue("");

	(async () => {
		const { textStream } = await streamText({
			model: openai(process.env.GPT_MODEL ?? "gpt-4-turbo"),
			prompt: input
		});

		for await (const delta of textStream) {
			stream.update(delta);
		}

		stream.done();
	})();

	return { output: stream.value };
}

// The handler for POST requests
export async function caseAITasks(
	text: string,
	task: AITask,
	options?: string
) {
	// Create a prompt based on the task
	let prompt = "";

	switch (task) {
		case AITask.Translate:
			prompt = `${basicPrompt} Translate the following text: "${text}" into ${options}`;
			break;
		case AITask.Improve:
			prompt = `${basicPrompt} Improve the following text: "${text}"`;
			break;
		case AITask.FixMistakes:
			prompt = `${basicPrompt} Fix mistakes in the following text: "${text}"`;
			break;
		case AITask.Simplify:
			prompt = `${basicPrompt} Simplify the following text: "${text}"`;
			break;
		case AITask.Summarize:
			prompt = `${basicPrompt} Summarize the following text: "${text}"`;
			break;
		case AITask.ChangeStyle:
			prompt = `${basicPrompt} Rewrite the following text in a ${options || "Professional"} tone: "${text}"`;
			break;
		case AITask.Regenerate:
			prompt = `${basicPrompt} Rewrite the following text in a different way`;
			break;
		case AITask.Custom:
			prompt = `${text}`;
			break;
		default:
			return { error: "invalid task" };
	}

	// Send the prompt to the OpenAI API using streaming
	try {
		const { output } = await generate(prompt);

		return { output };
	} catch (error) {
		throw new Error("Error processing request");
	}
}
