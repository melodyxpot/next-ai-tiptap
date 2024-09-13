import React from "react";
import { motion } from "framer-motion";
import { RotateCcw, X } from "lucide-react";

const ResultPopup: React.FC<ResultProps> = ({
	result,
	onClose,
	onAction,
	position
}) => (
	<motion.div
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: 10 }}
		transition={{ duration: 0.2 }}
		className="fixed z-30 w-80 bg-white border border-gray-200 rounded-lg shadow-xl"
		style={{
			top: position.y,
			left: position.x,
			transform: "translate(-50%, 8px)"
		}}
	>
		<div className="p-4">
			<div className="flex justify-between items-center mb-2">
				<h3 className="text-sm font-medium text-gray-900">AI Suggestion</h3>
				<button onClick={onClose} className="text-gray-400 hover:text-gray-500">
					<X className="w-4 h-4" />
				</button>
			</div>
			<p className="text-sm text-gray-600 mb-4">{result}</p>
			<div className="flex space-x-2">
				<button
					onClick={() => onAction("replace")}
					className="flex-1 bg-indigo-600 text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Replace selection
				</button>
				<button
					onClick={() => onAction("regenerate")}
					className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<RotateCcw className="w-5 h-5 text-gray-400" />
				</button>
			</div>
		</div>
	</motion.div>
);

export default ResultPopup;
