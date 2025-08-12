import React from 'react';
import clsx from 'clsx';

interface ToastProps {
  isOpen: boolean;
  message: React.ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success';
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ isOpen, message, type = 'info', onClose, actionLabel, onAction }) => {
  if (!isOpen) return null;

  const color = {
    info: 'bg-gray-900 text-white',
    warning: 'bg-amber-600 text-white',
    error: 'bg-red-600 text-white',
    success: 'bg-green-600 text-white',
  }[type];

  return (
    <div className="fixed inset-0 pointer-events-none flex items-end justify-center pb-6 z-50">
      <div
        className={clsx(
          'pointer-events-auto rounded-lg px-4 py-3 shadow-lg',
          'max-w-md w-full text-center',
          color
        )}
        role="alert"
      >
        <div className="flex items-center justify-center gap-3">
          <span className="flex-1">{message}</span>
          {actionLabel && onAction && (
            <button onClick={onAction} className="px-3 py-1 rounded bg-white/20 hover:bg-white/30">
              {actionLabel}
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="ml-1 text-white/80 hover:text-white">
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 