import React from "react";
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
  const { id, title, left, top } = props;
  return (
    <div
      style={getStyles(left, top, 100, 100)}
      className="flex flex-col"
      onClick={props.onClick}
    >
      <Kotak title={title} />
    </div>
  );
};

export default LokasiKotak;
