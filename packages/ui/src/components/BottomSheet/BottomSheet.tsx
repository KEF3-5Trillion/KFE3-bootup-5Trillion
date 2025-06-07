'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: string | number;
  enableBackdropClose?: boolean;
  className?: string;
  showHeader?: boolean;
  title?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  height = 'auto',
  enableBackdropClose = true,
  className = '',
  showHeader = false,
  title,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setDragY(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setIsVisible(false);
        setDragY(0);
      }, 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (enableBackdropClose && e.target === backdropRef.current) {
      onClose();
    }
  };

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    if (dragY > 100) {
      onClose();
    } else {
      setDragY(0);
    }
  }, [isDragging, dragY, onClose]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;

    e.preventDefault();
    setIsDragging(true);
    startYRef.current = e.clientY;
    setDragY(0);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    startYRef.current = e.touches[0].clientY;
    setDragY(0);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;

      const currentY = e.touches[0].clientY;
      const diff = Math.max(0, currentY - startYRef.current);
      setDragY(diff);
    },
    [isDragging],
  );

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = Math.max(0, e.clientY - startYRef.current);
      setDragY(diff);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleDragEnd]);

  if (!isVisible) return null;

  const sheetHeight = typeof height === 'number' ? `${height}px` : height;

  return createPortal(
    <div
      ref={backdropRef}
      className={`fixed inset-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? 'bg-neutral-100/50' : 'bg-transparent'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        ref={sheetRef}
        className={`fixed right-0 bottom-0 left-0 mx-0 flex w-full max-w-none flex-col rounded-t-3xl bg-white shadow-2xl ${isOpen ? 'translate-y-0' : 'translate-y-full'} ${isDragging ? '' : 'transition-transform duration-300 ease-out'} ${className} `}
        style={{
          height: sheetHeight,
          transform: `translateY(${dragY}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {showHeader && (
          <div
            className="flex cursor-grab items-center justify-between rounded-t-3xl px-6 py-8 select-none active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            style={{ userSelect: 'none' }}
          >
            {title && (
              <h2 className="font-style-headline-h4 pointer-events-none flex-1">
                {title}
              </h2>
            )}
          </div>
        )}

        <div
          className={`flex flex-1 flex-col ${showHeader ? 'pt-0' : 'pt-8'} overflow-hidden`}
        >
          <div className="flex-1 overflow-y-auto px-6 pb-9">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BottomSheet;
