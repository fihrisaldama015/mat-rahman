import { useDrop } from "react-dnd";

const DeleteButton = ({ onDelete }) => {
  const [, drop] = useDrop(() => ({
    accept: "box",
    drop: (item, monitor) => {
      onDelete(item.id);
    },
  }));

  return (
    <div
      ref={drop}
      className="absolute text-black transition-all duration-1000 bottom-12 right-4"
    >
      <button className="hover:py-8 hover:px-16 absolute py-3 px-10 top-0 right-0 bg-red-500 font-bold text-sm rounded-xl  text-white hover:bg-red-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0">
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
