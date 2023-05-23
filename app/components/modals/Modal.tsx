'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  head?: React.ReactElement;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  head,
  disabled,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showModal, handleClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div ref={modalRef} className="w-3/4 md:w-2/4">
          <div className={`translate duration-300 w-full bg-[#1A1B1F] rounded-xl
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-between p-3 rounded-t-xl">
              <div className="text-lg font-semibold text-white flex-1 text-center">
                {title}
              </div>
              <button className="hover:scale-110 transition" onClick={handleClose}>
                <IoMdClose
                  size={35}
                  color="white"
                  className="bg-zinc-800 rounded-full shadow-2xl px-2 font-bold"
                />
              </button>
            </div>
            <div className="px-3 mb-3">{head}</div>
            <div className="px-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
              {body}
            </div>
            <div className="h-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
