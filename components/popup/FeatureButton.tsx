import { ReactNode } from "react";

const FeatureButton: React.FC<{
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

export default FeatureButton;
