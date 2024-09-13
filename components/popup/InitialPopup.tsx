import React from "react";
import {
	ArrowUpNarrowWide,
	Languages,
	List,
	ScrollText,
	SpellCheck,
	WandSparkles
} from "lucide-react";
import ListSelection, { ListOption, iconClassName } from "../ui/ListSelection";
import Popup from "../ui/Popup";
import Separator from "../ui/Separator";
import SmallText from "../ui/SmallText";

export default function InitialPopup({
	onOptionSelect,
	setPopupState
}: {
	onOptionSelect: (_option: AITask, _v?: string) => void;
	setPopupState: React.Dispatch<React.SetStateAction<PopupState>>;
}) {
	return (
		<Popup>
			<SmallText>Modify Selection</SmallText>
			<ListSelection>
				<ListOption onClick={() => onOptionSelect(AITask.Improve)}>
					<WandSparkles className={iconClassName} />
					Improve writing
				</ListOption>
				<ListOption onClick={() => onOptionSelect(AITask.FixMistakes)}>
					<SpellCheck className={iconClassName} />
					Fix mistakes
				</ListOption>
				<ListOption onClick={() => onOptionSelect(AITask.Simplify)}>
					<ArrowUpNarrowWide className={iconClassName} />
					Simplify
				</ListOption>
			</ListSelection>
			<Separator />
			<SmallText>Generate</SmallText>
			<ListSelection>
				<ListOption onClick={() => onOptionSelect(AITask.Summarize)}>
					<List className={iconClassName} />
					Summarise
				</ListOption>
				<ListOption onClick={() => setPopupState("language")}>
					<Languages className={iconClassName} />
					Translate into...
				</ListOption>
				<ListOption onClick={() => setPopupState("style")}>
					<ScrollText className={iconClassName} />
					Change style to...
				</ListOption>
			</ListSelection>
		</Popup>
	);
}
