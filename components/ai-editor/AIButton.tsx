import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const AIButton: React.FC<AIButtonProps> = ({ onClick, position }) => (
	<motion.div
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: 10 }}
		transition={{ duration: 0.2 }}
		className="fixed z-10"
		style={{
			top: position.y,
			left: position.x,
			transform: "translate(-50%, 0)"
		}}
	>
		<button
			onClick={onClick}
			className="flex items-center space-x-1 bg-white border border-gray-200 rounded-md shadow-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<Sparkles className="w-4 h-4 text-indigo-500" />
			<span>AI</span>
		</button>
	</motion.div>
);

export default AIButton;
