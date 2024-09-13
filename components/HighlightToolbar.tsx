import React, { KeyboardEvent, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import {
	ArrowLeft,
	ArrowUpNarrowWide,
	Copy,
	Languages,
	List,
	ScrollText,
	SpellCheck,
	WandSparkles
} from "lucide-react";
import { AITask } from "@/@types";
import { contextStyles, languages } from "@/constants";
import { useAITooltipContext } from "@/contexts/AITooltipProvider";
import CopyButton from "./CopyButton";
import FeatureButton from "./popup/FeatureButton";
import Input from "./popup/Input";
import Selection, { iconClassName } from "./popup/Selection";

const HighlightToolbar: React.FC<FeaturePopupProps> = ({
	_onClose,
	onOptionSelect,
	position
}) => {
	const { generation } = useAITooltipContext();
	const [visibleState, setVisibleState] = useState<
		"main" | "language" | "style" | "result"
	>("main");

	const handleOptionChoose = (v: string, o: AITask) => {
		onOptionSelect(o, v);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			transition={{ duration: 0.2 }}
			className="fixed z-20 bg-transparent w-full max-w-96"
			style={{
				top: position.y,
				left: position.x,
				transform: "translate(-50%, 8px)"
			}}
		>
			{visibleState === "main" && (
				<>
					<Input handleOptionChoose={handleOptionChoose} />
					<div className="border bg-white border-gray-200 rounded-xl shadow-xl w-full max-w-44">
						<div className="border-b bg-transparent border-gray-200 p-1">
							<small className="flex items-center w-full px-3 py-2 text-[11px] text-left text-gray-600 select-none">
								Modify Selection
							</small>
							<FeatureButton onClick={() => onOptionSelect(AITask.Improve)}>
								<WandSparkles className={iconClassName} />
								Improve writing
							</FeatureButton>
							<FeatureButton onClick={() => onOptionSelect(AITask.FixMistakes)}>
								<SpellCheck className={iconClassName} />
								Fix mistakes
							</FeatureButton>
							<FeatureButton onClick={() => onOptionSelect(AITask.Simplify)}>
								<ArrowUpNarrowWide className={iconClassName} />
								Simplify
							</FeatureButton>
						</div>
						<div className="">
							<small className="flex items-center w-full px-3 py-2 text-[11px] text-left text-gray-600 select-none">
								Generate
							</small>
							<FeatureButton onClick={() => onOptionSelect(AITask.Summarize)}>
								<List className={iconClassName} />
								Summarise
							</FeatureButton>
							<FeatureButton onClick={() => setVisibleState("language")}>
								<Languages className={iconClassName} />
								Translate into...
							</FeatureButton>
							<FeatureButton onClick={() => setVisibleState("style")}>
								<ScrollText className={iconClassName} />
								Change style to...
							</FeatureButton>
						</div>
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

			{visibleState === "result" && (
				<div className="bg-card pointer-events-auto isolate origin-top-left overflow-hidden rounded-lg border border-gray-300/75 bg-white shadow-xl dark:border-gray-700/80 dark:bg-gray-900 dark:text-gray-200">
					<div className="flex items-start gap-1.5 border-b border-gray-300 leading-relaxed dark:border-gray-700/80 dark:bg-gray-800">
						<div className="relative max-h-[62px] flex-grow select-none overflow-y-auto whitespace-pre-wrap px-3 py-2 pr-10">
							<div className="sticky right-0 top-1 w-full">
								<button className="absolute -right-8 top-0 opacity-30 transition-opacity hover:opacity-60">
									<CopyButton />
								</button>
							</div>
							{generation}
						</div>
					</div>
					<Input handleOptionChoose={handleOptionChoose} />
				</div>
			)}
		</motion.div>
	);
};

export default HighlightToolbar;
