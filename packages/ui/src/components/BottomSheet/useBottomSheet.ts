import { useState, useCallback } from 'react';

export interface UseBottomSheetReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useBottomSheet = (initialState = false): UseBottomSheetReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
