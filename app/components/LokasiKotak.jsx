import React, {useState} from "react";
import Kotak from "./Kotak";

const getStyles = (left, top, width, height) => {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    width,
    height,
  };
};

const LokasiKotak = (props) => {
  const { id, title, left, top, setLongPress } = props;
  const [longPressTimer, setLongPressTimer] = useState(0);

  const handleMouseDown = () => {
    setLongPressTimer(setTimeout(() => {
      console.log("Long press is triggered");
      setLongPress({title,left, top});
    }, 800)); // 800ms = 0.8
  };

  const handleMouseUp = () => {
    clearTimeout(longPressTimer);
  };
  return (
    <div
      style={getStyles(left, top, 100, 100)}
      className="flex flex-col"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={props.onClick}
    >
      <Kotak title={title} />
    </div>
  );
};

export default LokasiKotak;
