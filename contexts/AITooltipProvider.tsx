"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext
} from "react";
import useAITooltip from "@/hooks/useAITooltip";
import { AITask } from "@/@types";

interface ContextProps {
	loading: boolean;
	generation: string;
	setSelectedText: Dispatch<SetStateAction<string>>;
	selectedText: string;
	handleSubmitAI: (task: AITask, style?: string) => void;
}

const AITooltipContext = createContext<ContextProps | undefined>(undefined);

//
export const AITooltipProvideer: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const { loading, generation, setSelectedText, selectedText, handleSubmitAI } =
		useAITooltip();

	return (
		<AITooltipContext.Provider
			value={{
				loading,
				generation,
				setSelectedText,
				selectedText,
				handleSubmitAI
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
