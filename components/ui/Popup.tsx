import React, { ReactNode } from "react";

export default function Popup({ children }: { children: ReactNode }) {
	return (
		<div className="border bg-white border-gray-200 rounded-xl shadow-xl w-full max-w-44">
			{children}
		</div>
	);
}
