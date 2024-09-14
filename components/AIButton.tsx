import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const AIButton: React.FC<AIButtonProps> = ({ onClick, position }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			transition={{ duration: 0.2 }}
			className="fixed z-10 border-border/80 bg-card rounded-lg border bg-white p-1 shadow-lg dark:border-gray-700/80 dark:bg-gray-800"
			style={{
				top: position.y,
				left: position.x,
				transform: "translate(-50%, 0)"
			}}
		>
			<div className="flex w-full gap-1 items-center justify-center">
				<button
					onClick={onClick}
					className="flex items-center space-x-1 bg-transparent rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
				>
					<Sparkles className="w-4 h-4 text-indigo-500" />
					<span>AI</span>
				</button>
				<div className="ml-1.5 mr-1.5 inline-block h-[15px] w-[120px] flex-grow rounded bg-gray-200/30 dark:bg-gray-700/40"></div>
			</div>
		</motion.div>
	);
};

export default AIButton;
