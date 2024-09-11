"use client";

import { autoUpdate, shift, useFloating } from "@floating-ui/react";
import clsx from "clsx";
import { useMedia } from "react-use";

interface PopupProps {
  rect?: DOMRect | null;
  visible: boolean;
  children: React.ReactNode;
}

export const Popup = ({ rect, visible, children }: PopupProps) => {
  const isMobile = useMedia("(max-width: 640px)");
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: isMobile ? "bottom" : "top",
    strategy: "fixed",
    middleware: [shift()],
  });

  if (!rect) {
    return null;
  }

  return (
    <div
      className={clsx(
        "flex absolute top-0 left-0 items-center justify-center pointer-events-none ",
      )}
      ref={refs.setReference}
      style={{
        transform: `translate(${rect.x}px, ${rect.y}px)`,
        width: rect.width,
        height: rect.height,
      }}
    >
      {visible && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="flex-grow-0 flex-shrink"
        >
          <div className="animate-in ease-in-out zoom-in-75 bg-white border rounded-md shadow-md py-2 px-3 flex flex-col flex-shrink min-w-[60vw] md:min-w-min max-w-[80vw] pointer-events-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
