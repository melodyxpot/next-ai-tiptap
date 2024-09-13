import React, { KeyboardEvent, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import {
	ArrowLeft,
	ArrowUpNarrowWide,
	Languages,
	List,
	ScrollText,
	SpellCheck,
	WandSparkles
} from "lucide-react";
import { AITask } from "@/@types";
import { contextStyles, languages } from "@/constants";

const iconClassName = "w-4 h-4 mr-2 text-indigo-500";

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

const ItemList: React.FC<{
	items: Array<{ content: ReactNode; onClick: () => void }>;
	onBack: any;
}> = ({ items, onBack }) => {
	return (
		<>
			<OptionButton onClick={onBack}>
				<ArrowLeft className={iconClassName} />
				Back
			</OptionButton>
			{items.map((i, idx) => (
				<OptionButton key={`list-${idx}`} onClick={i.onClick}>
					{i.content}
				</OptionButton>
			))}
		</>
	);
};

const Selection: React.FC<{
	label: AITask;
	items: Array<string>;
	onBack: () => void;
	onSelect: (_v: string, _o: AITask) => void;
}> = ({ items, onBack, onSelect, label }) => {
	return (
		<ItemList
			items={items.map(i => ({
				content: <p>{i}</p>,
				onClick: () => onSelect(i, label)
			}))}
			onBack={onBack}
		/>
	);
};

const FeaturePopup: React.FC<FeaturePopupProps> = ({
	_onClose,
	onOptionSelect,
	position
}) => {
	const [visibleState, setVisibleState] = useState<
		"main" | "language" | "style"
	>("main");
	const [prompt, setPrompt] = useState<string>("");

	const handleOptionChoose = (v: string, o: AITask) => {
		onOptionSelect(o, v);
	};

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleOptionChoose(prompt, AITask.Custom);
		}
	};

	return (
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
			{visibleState === "main" && (
				<>
					<div className="p-2 space-y-1">
						<input
							type="text"
							placeholder="Enter custom prompt..."
							onChange={e => setPrompt(e.currentTarget.value)}
							onKeyDown={handleInputKeyDown}
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>
					<div className="border-t border-gray-200">
						<small className="flex items-center w-full px-3 py-2 text-[11px] text-left text-gray-600">
							Modify Selection
						</small>
						<OptionButton onClick={() => onOptionSelect(AITask.Improve)}>
							<WandSparkles className={iconClassName} />
							Improve writing
						</OptionButton>
						<OptionButton onClick={() => onOptionSelect(AITask.FixMistakes)}>
							<SpellCheck className={iconClassName} />
							Fix mistakes
						</OptionButton>
						<OptionButton onClick={() => onOptionSelect(AITask.Simplify)}>
							<ArrowUpNarrowWide className={iconClassName} />
							Simplify
						</OptionButton>
					</div>
					<div className="border-t border-gray-200">
						<small className="flex items-center w-full px-3 py-2 text-[11px] text-left text-gray-600">
							Generate
						</small>
						<OptionButton onClick={() => onOptionSelect(AITask.Summarize)}>
							<List className={iconClassName} />
							Summarise
						</OptionButton>
						<OptionButton onClick={() => setVisibleState("language")}>
							<Languages className={iconClassName} />
							Translate into...
						</OptionButton>
						<OptionButton onClick={() => setVisibleState("style")}>
							<ScrollText className={iconClassName} />
							Change style to...
						</OptionButton>
					</div>
				</>
			)}
			{visibleState === "language" && (
				<Selection
					label={AITask.Translate}
					items={languages}
					onBack={() => setVisibleState("main")}
					onSelect={handleOptionChoose}
				/>
			)}
			{visibleState === "style" && (
				<Selection
					label={AITask.ChangeStyle}
					items={contextStyles}
					onBack={() => setVisibleState("main")}
					onSelect={handleOptionChoose}
				/>
			)}
		</motion.div>
	);
};

export default FeaturePopup;
