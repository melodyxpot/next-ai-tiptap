import React, { useState } from "react";
import { motion } from "framer-motion";
import { AITask } from "@/@types";
import AdditionalPopup from "./popup/AdditionalPopup";
import InitialPopup from "./popup/InitialPopup";
import InputPopup from "./popup/InputPopup";
import ModifyPopup from "./popup/ModifyPopup";

const HighlightToolbar: React.FC<FeaturePopupProps> = ({
	_onClose,
	onOptionSelect,
	replaceSelectedText,
	hideToolbar,
	visibleState,
	setVisibleState,
	position
}) => {
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
					<InputPopup handleOptionChoose={handleOptionChoose} />
					<InitialPopup
						onOptionSelect={onOptionSelect}
						setPopupState={setVisibleState}
					/>
				</>
			)}
			{visibleState === "language" && (
				<AdditionalPopup
					label={AITask.Translate}
					onBack={() => setVisibleState("main")}
					onSelect={handleOptionChoose}
				/>
			)}
			{visibleState === "style" && (
				<AdditionalPopup
					label={AITask.ChangeStyle}
					onBack={() => setVisibleState("main")}
					onSelect={handleOptionChoose}
				/>
			)}

			{visibleState === "result" && (
				<ModifyPopup
					handleOptionChoose={handleOptionChoose}
					replaceSelectedText={replaceSelectedText}
					onBack={() => setVisibleState("main")}
					onDiscard={hideToolbar}
				/>
			)}
		</motion.div>
	);
};

export default HighlightToolbar;
