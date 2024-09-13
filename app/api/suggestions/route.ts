import { NextResponse } from "next/server";
import OpenAI from "openai";
import { SelectionContext } from "@/types";
import { withRateLimit } from "../utils";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

// Set the runtime to edge for best performance
export const runtime = "edge";

export const POST = withRateLimit(async req => {
	const { before, selection, after } = (await req.json()) as SelectionContext;

	const joinedContext = `${before}[${selection}]${after}`
		.replace("\n", "\\n")
		.trim();

	console.log("joinedContext", joinedContext);

	// Ask OpenAI for a streaming completion given the prompt
	const response = await openai.completions.create({
		model: "gpt-3.5-turbo-instruct",
		temperature: 0.6,
		max_tokens: 256,
		stop: ["</suggestions"],
		prompt: `Suggest better ways to phrase the sentence inside the [...] square brackets. Only rephrase the text inside the brackets, not the text outside the brackets. Make sure the suggestions work in the context of the sentence.
<guidelines>
- Make sure a suggestion works in the context of the sentence.
- The suggestion should be an exact replacement of the text inside the brackets. No extra words should be added that do not fit in the context of the sentence.
- Return only one [...] block per suggestion.
- If newlines are present, place the string '\\n'.
</guidelines>
---
<example>
<input>
There are multiple ways [to refer to the] malaysian tiger. It is also known as the malayan tiger, the panthera tigris jacksoni, and the panthera tigris malayensis.
</input>
<suggestions>
- There are multiple ways [of referring to the] malaysian tiger.
- There are multiple ways [to describe the] malaysian tiger.
- There are multiple ways [to talk about the] malaysian tiger.
</suggestions>
</example>
<example>
<input>
The [tracks for the San Ramon Branch Line of the Southern Pacific Railroad were laid down and completed in 1891. The line extended from San Ramon to an unincorporated area known as Avon, east of Martinez,] where it connected to the Oakland/Stockton Line. On February 7, 1909, Southern Pacific extended the line south to Radum (near Pleasanton). In 1934, passenger service ended. By 1986, Contra Costa County had obtained the railroad right-of-way and the Iron Horse Regional Trail was established along its path.
</input>
<suggestions>
- The [tracks for the San Ramon Branch Line of the Southern Pacific Railroad were laid down and completed in 1891. The line extended from San Ramon to an unincorporated area known as Avon, east of Martinez,] where it connected to the Oakland/Stockton Line.
- The [tracks for the San Ramon Branch Line of the Southern Pacific Railroad were laid down and completed in 1891, and the line extended from San Ramon to Avon, east of Martinez,] where it connected to the Oakland/Stockton Line.
</suggestions>
</example>
---
<input>
${joinedContext}
</input>
<suggestions>`
	});

	const outputText = response.choices[0].text;

	console.log("--RAW_RESPONSE--");
	console.log(outputText);

	const suggestions = Array.from(
		new Set(
			outputText.split("\n").flatMap(suggestion => {
				const match = suggestion.match(/\[(.*?)\]/);
				const result = (match ? match[1] : suggestion.replace("- ", ""))
					.trim()
					.replace("\\n", "\n");

				if (result && result !== selection) {
					return result;
				}

				return [];
			})
		)
	);

	return NextResponse.json(suggestions);
});
