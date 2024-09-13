import React, { ReactNode } from "react";

export default function SmallText({ children }: { children?: ReactNode }) {
	return (
		<small className="flex items-center w-full px-3 py-2 text-[11px] text-left text-gray-600 select-none">
			{children}
		</small>
	);
}
