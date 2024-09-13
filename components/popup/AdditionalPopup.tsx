import React from "react";
import { ArrowLeft } from "lucide-react";
import { AITask } from "@/@types";
import { contextStyles, languages } from "@/constants";
import ListSelection, { ListOption, iconClassName } from "../ui/ListSelection";
import Popup from "../ui/Popup";

export default function AdditionalPopup({
	label,
	onBack,
	onSelect
}: {
	label: AITask;
	onBack: () => void;
	onSelect: (_v: string, _o: AITask) => void;
}) {
	const items = label === AITask.Translate ? languages : contextStyles;
	return (
		<Popup>
			<ListSelection>
				<ListOption onClick={onBack}>
					<ArrowLeft className={iconClassName} />
					Back
				</ListOption>
				{items.map(i => (
					<ListOption key={i} onClick={() => onSelect(i, label)}>
						{i}
					</ListOption>
				))}
			</ListSelection>
		</Popup>
	);
}
