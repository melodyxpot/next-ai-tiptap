import React from "react";
import {
	AlignJustify,
	Replace,
	RotateCcw,
	StepForward,
	Trash2
} from "lucide-react";
import { useAITooltipContext } from "@/contexts/AITooltipProvider";
import CopyButton from "../CopyButton";
import Input from "../ui/Input";
import ListSelection, { ListOption } from "../ui/ListSelection";
import { iconClassName } from "../ui/ListSelection";
import Popup from "../ui/Popup";
import Separator from "../ui/Separator";
import SmallText from "../ui/SmallText";

export default function ModifyPopup({
	handleOptionChoose
}: {
	handleOptionChoose: (_v: string, _o: globalThis.AITask) => void;
}) {
	const { generation } = useAITooltipContext();

	return (
		<div>
			<div className="bg-card pointer-events-auto isolate origin-top-left rounded-lg border border-gray-300/75 bg-white shadow-xl mb-2">
				<div className="border-b border-gray-300 leading-relaxed pr-8">
					<div className="relative max-h-[62px] select-none whitespace-pre-wrap px-3 py-2">
						<CopyButton text={generation} />
						{generation}
					</div>
				</div>
				<Input handleOptionChoose={handleOptionChoose} />
			</div>
			<Popup>
				<ListSelection>
					<ListOption onClick={() => console.log("replace selection")}>
						<Replace className={iconClassName} />
						Replace Selection
					</ListOption>
				</ListSelection>
				<Separator />
				<SmallText>Modify further</SmallText>
				<ListSelection>
					<ListOption onClick={() => console.log("replace selection")}>
						<StepForward className={iconClassName} />
						Continue Writing.
					</ListOption>
					<ListOption onClick={() => console.log("replace selection")}>
						<RotateCcw className={iconClassName} />
						Regenerate
					</ListOption>
					<ListOption onClick={() => console.log("replace selection")}>
						<AlignJustify className={iconClassName} />
						Other Options
					</ListOption>
				</ListSelection>
				<Separator />
				<ListSelection>
					<ListOption onClick={() => console.log("replace selection")}>
						<Trash2 className={`text-gray-500 ${iconClassName} `} />
						Discard
					</ListOption>
				</ListSelection>
			</Popup>
		</div>
	);
}
