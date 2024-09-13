"use client";

import { useChat } from "ai/react";

export default function useAITooltip() {
	const { messages, input, handleSubmit, handleInputChange, isLoading } =
		useChat();

	return {
		messages,
		input,
		handleSubmit,
		handleInputChange,
		isLoading
	};
}
