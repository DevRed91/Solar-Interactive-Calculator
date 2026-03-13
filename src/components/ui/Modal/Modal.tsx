import { ModalProps } from '@/lib/types';
import { useEffect, useRef } from 'react';

const Modal = ({
  open,
  onClose,
  children,
  style,
  disableOutsideClick = false,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (!disableOutsideClick) {
      if (open) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEsc);
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEsc);
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }

    return () => {
      document.body.style.overflow = ''; // Make sure to enable scroll on unmount
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose, disableOutsideClick]);

  // Return null if modal is not open
  if (!open) return null;

  return (
    <div className="bg-black-900/50 fixed inset-0 z-[100] flex h-dvh w-dvw items-center justify-center backdrop-blur-lg">
      <div
        ref={modalRef}
        style={style}
        className="bg-background-50 max-h-[90vh] overflow-y-scroll rounded-3xl shadow-md backdrop-blur-lg"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
