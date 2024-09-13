import { Editor as IEditor } from "@tiptap/core";
import { Node } from "@tiptap/pm/model";
import { Transaction } from "@tiptap/pm/state";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

import { SelectionContext } from "@/types";
import { exponentialBackoff, fetchWithRetry } from "@/utils/index";

export const fetchSuggestions = async (context: SelectionContext) => {
  const response = await fetchWithRetry("/api/suggestions", {
    retryOn: [429],
    retryDelay: exponentialBackoff,
    retries: 5,
    method: "POST",
    body: JSON.stringify(context),
  });

  return response.json() as Promise<string[]>;
};

export const fetchCompletion = async (text: string) => {
  const response = await fetchWithRetry("/api/completion", {
    retryOn: [429],
    retryDelay: exponentialBackoff,
    retries: 5,
    method: "POST",
    body: JSON.stringify({ text }),
  });

  return (await response.json()).completionText as string;
};

export const getTextForSlice = (node: Node) => {
  return node.textBetween(0, node.nodeSize - 2, "\n");
};

const CONTEXT_PADDING_CHARS = 64;

export const getSelectionContext = (
  doc: Node,
  selectionStart: number,
  selectionEnd: number,
) => {
  const contextStart = Math.max(0, selectionStart - CONTEXT_PADDING_CHARS);
  const contextEnd = Math.min(
    selectionEnd + CONTEXT_PADDING_CHARS,
    doc.content.size,
  );

  const wordBoundaryRegex = /[\s\(\)\[\]\.,;:!?]/;
  const textBeforeSelection = getTextForSlice(
    doc.cut(contextStart, selectionStart),
  );
  const reversedTextBeforeSelection = textBeforeSelection
    .split("")
    .reverse()
    .join("");
  let wordBoundaryBefore =
    reversedTextBeforeSelection.search(wordBoundaryRegex);
  if (wordBoundaryBefore === -1) {
    wordBoundaryBefore = reversedTextBeforeSelection.length;
  }
  const textAfterSelection = getTextForSlice(doc.cut(selectionEnd, contextEnd));

  let wordBoundaryAfter = textAfterSelection.search(wordBoundaryRegex);
  if (wordBoundaryAfter === -1) {
    wordBoundaryAfter = textAfterSelection.length;
  }

  selectionStart -= wordBoundaryBefore;
  selectionEnd += wordBoundaryAfter;

  const context: SelectionContext = {
    before: getTextForSlice(doc.cut(contextStart, selectionStart)),
    selection: getTextForSlice(doc.cut(selectionStart, selectionEnd)),
    after: getTextForSlice(doc.cut(selectionEnd, contextEnd)),
    selectionStart,
    selectionEnd,
  };

  return context;
};

export const useSuggestions = () => {
  const [context, setContext] = React.useState<SelectionContext | null>(null);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<"idle" | "fetching" | "done">(
    "idle",
  );

  const transactionRef = React.useRef<number>(0);

  const statusRef = React.useRef<"idle" | "fetching" | "done">("idle");
  React.useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const onBlur = React.useCallback(() => {
    setSuggestions([]);
    setStatus("idle");
    setContext(null);
  }, []);

  const debouncedGetSuggestions = useDebouncedCallback(
    async (editor: IEditor, transaction: Transaction) => {
      const context = getSelectionContext(
        editor.state.doc,
        transaction.selection.from,
        transaction.selection.to,
      );

      setContext(context);
      setStatus("fetching");

      editor
        .chain()
        .setTextSelection({
          from: context.selectionStart,
          to: context.selectionEnd,
        })
        .setMeta("isSystemAction", true)
        .run();

      const transactionId = Date.now();
      transactionRef.current = transactionId;

      const suggestions = await fetchSuggestions(context);

      if (
        transactionId === transactionRef.current &&
        statusRef.current === "fetching"
      ) {
        setSuggestions(suggestions);
        setStatus("done");
      }
    },
    250,
    {
      leading: false,
    },
  );

  const getSuggestionsHandler = React.useCallback(
    (editor: IEditor, transaction: Transaction) => {
      if (transaction.selection.empty) {
        setSuggestions([]);
        setStatus("idle");
        setContext(null);
      } else if (
        status === "idle" ||
        (status === "done" && !transaction.getMeta("isSystemAction"))
      ) {
        debouncedGetSuggestions(editor, transaction);
      }
    },
    [debouncedGetSuggestions, status],
  );

  return {
    context,
    suggestions,
    status,
    debouncedGetSuggestions: getSuggestionsHandler,
    onBlur,
  };
};

const MIN_DOC_LENGTH_FOR_COMPLETION = 16;
const COMPLETION_CONTEXT_CHARS = 128;

export const useCompletion = () => {
  const debouncedCompletion = useDebouncedCallback(
    async (editor: IEditor) => {
      const text = getTextForSlice(
        editor.state.doc.cut(
          Math.max(0, editor.state.selection.from - COMPLETION_CONTEXT_CHARS),
          editor.state.selection.from,
        ),
      );

      const completion = await fetchCompletion(text);

      editor.commands.previewCompletion(completion);
    },
    500,
    { leading: false },
  );

  const removePreviewCompletion = React.useCallback((editor: IEditor) => {
    editor.commands.revertCompletion();
  }, []);

  const onContentChange = React.useCallback(
    (editor: IEditor, transaction: Transaction) => {
      const isSystemAction = transaction.getMeta("isSystemAction");
      if (!isSystemAction) {
        editor.commands.revertCompletion();
        if (
          editor.state.selection.empty &&
          editor.state.doc.textContent.length > MIN_DOC_LENGTH_FOR_COMPLETION
        ) {
          debouncedCompletion(editor);
        }
      }
    },
    [debouncedCompletion],
  );

  return { onContentChange, removePreviewCompletion };
};
