import { Mark, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import AIToolbar from "./AIToolbar";

export const AIToolbarMark = Mark.create({
  name: "aiToolbar",

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { class: "ai-toolbar-mark" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(AIToolbar);
  },

  // addCommands() {
  //   return {
  //     customCommand: () => ({ chain }: {chain: any}) => {
  //       // Doesn’t work:
  //       // return editor.chain() …

  //       // Does work:
  //       return chain()
  //         .insertContent('foo!')
  //         .insertContent('bar!')
  //         .run()
  //     },
  //   }
  // }
});
