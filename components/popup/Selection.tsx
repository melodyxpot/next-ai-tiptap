import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import FeatureButton from "./FeatureButton";

export const iconClassName = "w-4 h-4 mr-2 text-indigo-500";

const ItemList: React.FC<{
	items: Array<{ content: ReactNode; onClick: () => void }>;
	onBack: any;
}> = ({ items, onBack }) => {
	return (
		<div className="border bg-white border-gray-200 rounded-xl shadow-xl w-full max-w-44 p-2 max-h-72 overflow-auto">
			<FeatureButton onClick={onBack}>
				<ArrowLeft className={iconClassName} />
				Back
			</FeatureButton>
			{items.map((i, idx) => (
				<FeatureButton key={`list-${idx}`} onClick={i.onClick}>
					{i.content}
				</FeatureButton>
			))}
		</div>
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

export default Selection;
