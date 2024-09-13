"use client";

import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CopyButton({ text }: { text: string }) {
	return (
		<CopyToClipboard text={text}>
			<button className="absolute -right-6 top-2 opacity-30 transition-opacity hover:opacity-60">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="h-4"
				>
					<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
					<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
				</svg>
			</button>
		</CopyToClipboard>
	);
}
