import Image from "next/image";
import AIEditor from "@/components/AIEditor";
import { AITooltipProvideer } from "@/contexts/AITooltipProvider";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col">
			<div className="container flex flex-col pt-48 mx-auto gap-8 pb-[100vh]">
				<div className="px-2 mx-auto flex flex-col items-center gap-2">
					<div className="flex flex-row items-center gap-1 -ml-2">
						<Image
							width={36}
							height={36}
							src="/magic-pen-icon.png"
							alt="Magic editor icon"
						/>
						<h1 className="text-2xl font-semibold">AI Editor</h1>
					</div>
					<span className="text-sm text-gray-400 tracking-normal text-center px-8">
						Start typing to use AI toolbar; select any text to modify the text
						with AI
					</span>
				</div>
				<AITooltipProvideer>
					<AIEditor />
				</AITooltipProvideer>
			</div>
		</main>
	);
}
