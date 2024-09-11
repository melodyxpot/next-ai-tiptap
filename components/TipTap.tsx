"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AIToolbarMark } from "./AIToolbarMark";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, AIToolbarMark],
    content: "<p>Select some text to see the AI toolbar.</p>",
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      if (from !== to) {
        editor.commands.setAIToolbar();
      } else {
        editor.commands.unsetAIToolbar();
      }
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
