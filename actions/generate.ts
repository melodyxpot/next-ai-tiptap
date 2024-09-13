"use server";

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { AITask } from "@/@types";

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
	options?: AITextStyle | Language
) {
	// Create a prompt based on the task
	let prompt = "";

	switch (task) {
		case AITask.Translate:
			prompt = `Translate the following text: "${text}" into ${options}`;
			break;
		case AITask.Improve:
			prompt = `Improve the following text: "${text}"`;
			break;
		case AITask.FixMistakes:
			prompt = `Fix mistakes in the following text: "${text}"`;
			break;
		case AITask.Simplify:
			prompt = `Simplify the following text: "${text}"`;
			break;
		case AITask.Summarize:
			prompt = `Summarize the following text: "${text}"`;
			break;
		case AITask.ChangeStyle:
			prompt = `Rewrite the following text in a ${options || "Professional"} tone: "${text}"`;
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
