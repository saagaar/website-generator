import { useState, useCallback, KeyboardEvent } from 'react';

interface UseKeyboardNavOptions {
  itemCount: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export function useKeyboardNav({ itemCount, onSelect, onClose }: UseKeyboardNavOptions) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const resetIndex = useCallback(() => setHighlightedIndex(-1), []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (itemCount === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((i) => (i < itemCount - 1 ? i + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((i) => (i > 0 ? i - 1 : itemCount - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) onSelect(highlightedIndex);
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          resetIndex();
          break;
      }
    },
    [itemCount, highlightedIndex, onSelect, onClose, resetIndex]
  );

  return { highlightedIndex, handleKeyDown, resetIndex };
}
