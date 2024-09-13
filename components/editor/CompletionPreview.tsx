import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export const CompletionPreview = () => {
	return (
		<NodeViewWrapper as="span">
			<NodeViewContent as="span" className="text-gray-300" />
			<span className="relative text-[0.667rem] text-gray-400 font-medium px-1 border rounded border-gray-200 bg-gray-100">
				TAB
			</span>
		</NodeViewWrapper>
	);
};
