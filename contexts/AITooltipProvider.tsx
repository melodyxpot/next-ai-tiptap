"use client";

import { ReactNode, createContext, useContext } from "react";
import { ChatRequestOptions, Message } from "ai";
import useAITooltip from "@/hooks/useAITooltip";

interface ContextProps {
	messages: Message[];
	input: string;
	handleSubmit: (
		event?: { preventDefault?: () => void },
		chatRequestOptions?: ChatRequestOptions
	) => void;
	handleInputChange: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void;
	isLoading: boolean;
}

const AITooltipContext = createContext<ContextProps | undefined>(undefined);

export const AITooltipProvideer: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const { messages, input, handleSubmit, handleInputChange, isLoading } =
		useAITooltip();

	return (
		<AITooltipContext.Provider
			value={{
				messages,
				input,
				handleSubmit,
				handleInputChange,
				isLoading
			}}
		>
			{children}
		</AITooltipContext.Provider>
	);
};

export const useAITooltipContext = () => {
	const context = useContext(AITooltipContext);
	if (!context) {
		throw new Error(
			"useAITooltipContext must be used within a AITooltipProvider"
		);
	}
	return context;
};
