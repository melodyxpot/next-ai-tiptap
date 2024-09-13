import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import {
	ArrowUpNarrowWide,
	ChevronDown,
	Languages,
	List,
	ScrollText,
	SpellCheck,
	WandSparkles
} from "lucide-react";
import { AITask } from "@/@types";

const OptionButton: React.FC<{
	children: ReactNode;
	onClick: () => void;
}> = ({ children, onClick }) => {
	return (
		<button
			className="flex items-center w-full px-3 py-2 text-xs text-left text-gray-700 hover:bg-gray-100 rounded-lg transition"
			onClick={onClick}
		>
			{children}
		</button>
	);
};

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
		className="fixed z-20 w-64 bg-white border border-gray-200 rounded-lg shadow-xl p-1"
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
		</div>
		<div className="border-t border-gray-200">
			<small className="flex items-center w-full px-3 py-2 text-[11px] text-left text-gray-600">
				Modify Selection
			</small>
			<OptionButton onClick={() => onOptionSelect(AITask.Improve)}>
				<WandSparkles className="w-4 h-4 mr-2 text-indigo-500" />
				Improve writing
			</OptionButton>
			<OptionButton onClick={() => onOptionSelect(AITask.FixMistakes)}>
				<SpellCheck className="w-4 h-4 mr-2 text-indigo-500" />
				Fix mistakes
			</OptionButton>
			<OptionButton onClick={() => onOptionSelect(AITask.Simplify)}>
				<ArrowUpNarrowWide className="w-4 h-4 mr-2 text-indigo-500" />
				Simplify
			</OptionButton>
		</div>
		<div className="border-t border-gray-200">
			<small className="flex items-center w-full px-3 py-2 text-[11px] text-left text-gray-600">
				Generate
			</small>
			<OptionButton onClick={() => onOptionSelect(AITask.Summarize)}>
				<List className="w-4 h-4 mr-2 text-indigo-500" />
				Summarise
			</OptionButton>
			<OptionButton onClick={() => onOptionSelect(AITask.Translate)}>
				<Languages className="w-4 h-4 mr-2 text-indigo-500" />
				Translate into...
			</OptionButton>
			<OptionButton onClick={() => onOptionSelect(AITask.ChangeStyle)}>
				<ScrollText className="w-4 h-4 mr-2 text-indigo-500" />
				Change style to...
			</OptionButton>
		</div>
	</motion.div>
);

export default FeaturePopup;
