const ButtonNextStep = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="absolute bg-green-500 ring-1 ring-green-600 rounded-xl py-12 px-16 right-16 top-8 text-white hover:bg-green-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
    >
      Next
    </button>
  );
};

const ButtonPrevStep = ({ onClick, disabled }) => {
  return (
    <button
      className="absolute bg-red-500 ring-1 ring-red-600 rounded-xl py-12 px-16 left-16 top-8 text-white hover:bg-red-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
      onClick={onClick}
      disabled={disabled}
    >
      Prev
    </button>
  );
};

export { ButtonNextStep, ButtonPrevStep };
