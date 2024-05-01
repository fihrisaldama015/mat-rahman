import { useDrop } from "react-dnd";

const DeleteButton = ({ onDelete, isDragging}) => {
    const [, drop] = useDrop(() => ({
        accept: "box",
        drop: (item, monitor) => {
            onDelete(item.id);
        },
    }));

    return (
        <div
            ref={drop}
            className={`${isDragging?"visible opacity-100":"invisible opacity-0"} transition-opacity absolute text-black transition-all duration-1000 bottom-12 right-4`}
        >
            <button
                className="absolute py-3 px-10 top-0 right-0 bg-red-500 font-bold text-sm rounded-xl  text-white hover:bg-red-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
            >
                Delete
            </button>
        </div>
    );
};

export default DeleteButton;
