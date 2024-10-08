import React from "react";
import { IoIosClose } from "react-icons/io";

const Modal = ({ children, onClose }) => {
  return (
    <div className="absolute w-5/6 md:w-4/6 z-50 lg:w-[600px] h-[650px] bg-white border-2 shadow-lg drop-shadow-lg top-1/4">
      <div className="flex h-full">
        <button
          onClick={onClose}
          className="absolute text-2xl p-2 right-0 hover:bg-red-500 hover:text-white active:opacity-70"
        >
          <IoIosClose />
        </button>
        <div className="flex w-full h-full flex-col p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
