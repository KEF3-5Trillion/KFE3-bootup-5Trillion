'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface BottomSheetProps {
  /** 바텀시트 표시 여부 */
  isOpen: boolean;
  /** 바텀시트 닫기 콜백 */
  onClose: () => void;
  /** 바텀시트 내용 */
  children: React.ReactNode;
  /** 바텀시트 높이 (기본값: auto) */
  height?: string | number;
  /** 배경 클릭으로 닫기 기능 사용 여부 */
  enableBackdropClose?: boolean;
  /** 커스텀 클래스명 */
  className?: string;
  /** 헤더 표시 여부 */
  showHeader?: boolean;
  /** 제목 */
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
      setDragY(0); // 바텀시트가 열릴 때 dragY 초기화
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setIsVisible(false);
        setDragY(0); // 바텀시트가 완전히 닫힌 후 dragY 초기화
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

  // 마우스 드래그 시작
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 버튼 클릭인지 확인
    if ((e.target as HTMLElement).closest('button')) return;

    e.preventDefault();
    setIsDragging(true);
    startYRef.current = e.clientY;
    setDragY(0);
  }, []);

  // 터치 드래그 시작
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

  // 전역 마우스 이벤트
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
        className={`fixed right-0 bottom-0 left-0 mx-0 flex w-full max-w-none flex-col rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'} ${isDragging ? '' : 'transition-transform duration-300 ease-out'} ${className} `}
        style={{
          height: sheetHeight,
          transform: `translateY(${dragY}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 헤더 - 드래그 가능 */}
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

        {/* 컨텐츠 */}
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
