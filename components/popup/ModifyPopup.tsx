import React from "react";
import {
	AlignJustify,
	Replace,
	RotateCcw,
	StepForward,
	Trash2
} from "lucide-react";
import { useAITooltipContext } from "@/contexts/AITooltipProvider";
import CopyButton from "../ui/CopyButton";
import Input from "../ui/Input";
import ListSelection, { ListOption } from "../ui/ListSelection";
import { iconClassName } from "../ui/ListSelection";
import Popup from "../ui/Popup";
import Separator from "../ui/Separator";
import SmallText from "../ui/SmallText";

export default function ModifyPopup({
	handleOptionChoose,
	replaceSelectedText,
	onBack,
	onDiscard
}: {
	handleOptionChoose: (_v: string, _o: globalThis.AITask) => void;
	replaceSelectedText: () => void;
	onBack: () => void;
	onDiscard: () => void;
}) {
	const { generation } = useAITooltipContext();

	return (
		<div>
			<div className="bg-card pointer-events-auto isolate origin-top-left rounded-lg border border-gray-300/75 bg-white shadow-xl mb-2 min-w-[400px]">
				<div className="border-b border-gray-300 leading-relaxed pr-8">
					<div className="relative min-h-[32px] select-none whitespace-pre-wrap px-3 py-2 text-xs">
						<CopyButton text={generation} />
						{generation}
					</div>
				</div>
				<Input handleOptionChoose={handleOptionChoose} />
			</div>
			<Popup>
				<ListSelection>
					<ListOption onClick={() => replaceSelectedText()}>
						<Replace className={iconClassName} />
						Replace Selection
					</ListOption>
				</ListSelection>
				<Separator />
				<SmallText>Modify further</SmallText>
				<ListSelection>
					{/* <ListOption onClick={() => console.log("replace selection")}>
						<StepForward className={iconClassName} />
						Continue Writing.
					</ListOption> */}
					<ListOption onClick={() => handleOptionChoose("", AITask.Regenerate)}>
						<RotateCcw className={iconClassName} />
						Regenerate
					</ListOption>
					<ListOption onClick={onBack}>
						<AlignJustify className={iconClassName} />
						Other Options
					</ListOption>
				</ListSelection>
				<Separator />
				<ListSelection>
					<ListOption onClick={onDiscard}>
						<Trash2 className={`${iconClassName} !text-gray-500`} />
						Discard
					</ListOption>
				</ListSelection>
			</Popup>
		</div>
	);
}
