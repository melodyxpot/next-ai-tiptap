import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Copy, List, Play, Sparkles } from "lucide-react";

const FeaturePopup: React.FC<FeaturePopupProps> = ({
	_onClose,
	onOptionSelect,
	position
}) => (
	<motion.div
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: 10 }}
		transition={{ duration: 0.2 }}
		className="fixed z-20 w-64 bg-white border border-gray-200 rounded-lg shadow-xl"
		style={{
			top: position.y,
			left: position.x,
			transform: "translate(-50%, 8px)"
		}}
	>
		<div className="p-2 space-y-1">
			<input
				type="text"
				placeholder="Enter custom prompt..."
				className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
			/>
			<button
				onClick={() => onOptionSelect("Modify selection")}
				className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-md"
			>
				<ChevronDown className="w-4 h-4 mr-2" />
				Modify selection
			</button>
		</div>
		<div className="border-t border-gray-200">
			<button
				onClick={() => onOptionSelect("Improve writing")}
				className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
			>
				<Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
				Improve writing
			</button>
			<button
				onClick={() => onOptionSelect("Fix mistakes")}
				className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
			>
				<Copy className="w-4 h-4 mr-2 text-indigo-500" />
				Fix mistakes
			</button>
			<button
				onClick={() => onOptionSelect("Simplify")}
				className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
			>
				<Play className="w-4 h-4 mr-2 text-indigo-500" />
				Simplify
			</button>
		</div>
		<div className="border-t border-gray-200 p-2">
			<button
				onClick={() => onOptionSelect("Summarise")}
				className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-md"
			>
				<List className="w-4 h-4 mr-2 text-indigo-500" />
				Summarise
			</button>
		</div>
	</motion.div>
);

export default FeaturePopup;
