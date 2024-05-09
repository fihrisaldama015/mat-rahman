"use client";
import { useState } from "react";
import { useDrop } from "react-dnd";

const DeleteButton = ({ onDelete, isDragging }) => {
  const [isHover, setIsHover] = useState(false);
  const [, drop] = useDrop(() => ({
    accept: "box",
    drop: (item, monitor) => {
      onDelete(item.id);
      setIsHover(false);
    },
    hover: (item, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        setIsHover(true);
      } else {
        setIsHover(false);
      }
    },
  }));

  return (
    <div
      ref={drop}
      className={`${
        isDragging ? "visible opacity-100" : "invisible opacity-0"
      } absolute text-black transition-all duration-1000 bottom-12 right-4`}
    >
      <button
        className={`absolute ${
          isHover ? "py-12 px-16 bg-red-300" : "py-6 px-10 bg-red-500"
        } bottom-0 right-0 font-bold text-sm rounded-xl  text-white hover:bg-red-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0`}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
