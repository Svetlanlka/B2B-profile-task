import { useEffect } from "react";

export function useSaveCursorPostion(ref, cursorPos) {
  useEffect(() => {
    if (ref !== null) {
        ref.current.selectionStart = cursorPos;
        ref.current.selectionEnd = cursorPos;
    }
  }, [ref, cursorPos]);
}