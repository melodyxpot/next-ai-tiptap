"use client";

import { CoreMessage } from "ai";
import { readStreamableValue } from "ai/rsc";
import { continueConversation } from "@/actions/ai";
import { useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";

export default function AiToolbar() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState<string>("");

  async function queryAi(prompt: string) {
    // Add the new prompt to the existing messages, so it remembers
    const newMessages: CoreMessage[] = [
      ...messages,
      { content: prompt, role: "user" },
    ];

    // Send to AI and stream in results
    const result = await continueConversation(newMessages);

    // Add each chunk as its received
    for await (const content of readStreamableValue(result)) {
      if (content !== undefined) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: content,
          },
        ]);
      }
    }
  }

  return (
    <NodeViewWrapper className="ai-toolbar">
      <div className="ai-toolbar-content">
        <input
          type="text"
          placeholder="Ask AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => queryAi(input)}>Send</button>
      </div>
      {messages.length > 0 && (
        <div className="ai-response">
          {messages[messages.length - 1].content}
        </div>
      )}
    </NodeViewWrapper>
  );
}
