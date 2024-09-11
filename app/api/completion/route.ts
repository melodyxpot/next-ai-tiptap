import { NextResponse } from "next/server";
import OpenAI from "openai";

import { withRateLimit } from "../utils";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

export const POST = withRateLimit(async (req) => {
  const { text } = await req.json();

  console.log("completion input", text);

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    temperature: 0.8,
    max_tokens: 256,
    stop: ["</write>", "<write>", "\n"],
    prompt: `You are an autocomplete tool. Complete the incomplete text given inside the <write> block. Make sure the what you write works in the context of the text.
        <guidelines>
        - Write at most one sentence.
        - Keep the style of writing consistent with the rest of the text.
        - If the text contains an incomplete word, complete the word.
        </guidelines>
        <write>
        ${text}`,
  });

  const outputText = response.choices[0].text;

  console.log("--COMPLETION_RAW_RESPONSE--");
  console.log(outputText);

  return NextResponse.json({
    completionText: outputText,
  });
});
