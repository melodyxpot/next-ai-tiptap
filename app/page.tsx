import Image from "next/image";
// import EditorComponent from "@/components/EditorComponent";
// import { Editor } from "@/components";
import AIEditor from "@/components/editor/AIEditor";
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
						<h1 className="text-2xl font-semibold">Magic Editor</h1>
					</div>
					<span className="text-sm text-gray-400 tracking-normal text-center px-8">
						Start typing to use autocompletion; select any text to trigger
						suggestions
					</span>
				</div>
				<AITooltipProvideer>
					{/* <Editor /> */}
					<AIEditor />
					{/* <EditorComponent /> */}
				</AITooltipProvideer>
			</div>
		</main>
	);
}
