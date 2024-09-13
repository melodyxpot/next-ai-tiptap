import React from "react";
import Input from "../ui/Input";

export default function InputPopup({
	handleOptionChoose
}: {
	handleOptionChoose: (_v: string, _o: AITask) => void;
}) {
	return (
		<div className="space-y-1 bg-white border border-gray-200 rounded-lg shadow-xl p-1 mb-2 w-full">
			<Input handleOptionChoose={handleOptionChoose} />
		</div>
	);
}
