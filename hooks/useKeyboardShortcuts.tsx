"use client";

import { useEffect } from 'react';

interface KeyboardShortcutsConfig {
  onReply?: () => void;
  onCopy?: () => void;
  onStar?: () => void;
  onDelete?: () => void;
  onSelectAll?: () => void;
  onClearSelection?: () => void;
  onEscape?: () => void;
}

export const useKeyboardShortcuts = (config: KeyboardShortcutsConfig) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when not in an input field
      const activeElement = document.activeElement as HTMLElement;
      const isInputFocused = 
        activeElement?.tagName === 'INPUT' || 
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.contentEditable === 'true';

      if (isInputFocused) return;

      const { ctrlKey, metaKey, key, shiftKey } = event;
      const isCtrlOrCmd = ctrlKey || metaKey;

      switch (key.toLowerCase()) {
        case 'r':
          if (isCtrlOrCmd) {
            event.preventDefault();
            config.onReply?.();
          }
          break;
        
        case 'c':
          if (isCtrlOrCmd && !shiftKey) {
            event.preventDefault();
            config.onCopy?.();
          }
          break;
        
        case 's':
          if (isCtrlOrCmd) {
            event.preventDefault();
            config.onStar?.();
          }
          break;
        
        case 'delete':
        case 'backspace':
          if (!isCtrlOrCmd) {
            event.preventDefault();
            config.onDelete?.();
          }
          break;
        
        case 'a':
          if (isCtrlOrCmd) {
            event.preventDefault();
            config.onSelectAll?.();
          }
          break;
        
        case 'escape':
          event.preventDefault();
          config.onEscape?.();
          break;
        
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [config]);
};

export default useKeyboardShortcuts;
