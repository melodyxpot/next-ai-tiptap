import { ReactNode } from "react";

export const iconClassName = "w-4 h-4 mr-2 text-indigo-500";

export const ListOption: React.FC<{
	children?: ReactNode;
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

const ListSelection: React.FC<{
	children?: ReactNode;
}> = ({ children }) => {
	return <div className="p-2">{children}</div>;
};

export default ListSelection;
