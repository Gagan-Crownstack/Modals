import { useState } from "react";
import SignUp from "../components/SignUp";
import Modal from "../components/Modal";
import AdFrind from "../components/AdFrind";

const Dashboard = () => {
  const [show, setshow] = useState(false);
  const [content, setContent] = useState(null);

  const openModal = (content) => {
    setshow(true);
    setContent(content);
  };

  const onClose = () => {
    setshow(false);
    setContent(null);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-5">
      {show && <Modal onClose={onClose}>{content}</Modal>}

      <button
        className="py-2 px-4 rounded-md bg-teal-500 shadow-md hover:opacity-90 active:opacity-70"
        onClick={() => openModal(<SignUp />)}
      >
        Sign Up
      </button>
      <button
        className="py-2 px-4 rounded-md bg-teal-500 shadow-md hover:opacity-90 active:opacity-70"
        onClick={() => openModal(<AdFrind />)}
      >
        Add friends
      </button>
    </div>
  );
};

export default Dashboard;
