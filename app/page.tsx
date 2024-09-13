import Image from "next/image";
import { SparklesIcon } from "lucide-react";
// import EditorComponent from "@/components/EditorComponent";
import { Editor } from "@/components";
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
					<Editor />
					{/* <EditorComponent /> */}
				</AITooltipProvideer>
				<span className="text-sm text-gray-400 tracking-normal text-center px-8">
					Start typing to use autocompletion; select any text to trigger
					suggestions
				</span>

				<div className="p-4 max-w-lg mx-auto">
					<div className="flex items-center justify-between p-3 border border-gray-300 rounded-t-lg relative">
						<p className="text-gray-700 text-sm max-w-[90%]">
							Kiwifruit was originally known as the Chinese gooseberry before
							being rebranded for marketing purposes when introduced to New
							Zealand.
						</p>
						<SparklesIcon className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2" />
					</div>

					<div className="relative">
						<input
							type="text"
							className="w-full p-3 border border-t-0 border-gray-300 rounded-b-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-gray-600"
							placeholder="Enter custom prompt..."
						/>
						<SparklesIcon className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2" />
					</div>

					<div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full text-sm max-w-48">
						<ul className="py-1">
							<li className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-600 border-gray-300 border-b">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 4v16m8-8H4"
									/>
								</svg>
								Replace selection
							</li>
							<li className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M8 9l3 3-3 3m5-6l3 3-3 3"
									/>
								</svg>
								Continue writing
							</li>
							<li className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 10l7-7m0 0l7 7m-7-7v18"
									/>
								</svg>
								Regenerate
							</li>
							<li className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16m-7 6h7"
									/>
								</svg>
								Other options
							</li>
							<li className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-600 border-gray-300 border-t">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								Discard
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
}
