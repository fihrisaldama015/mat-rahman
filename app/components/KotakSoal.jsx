import React from "react";
import Kotak from "./Kotak";
import { useDrag } from "react-dnd";

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

const KotakSoal = (props) => {
  const { id, title, left, top } = props;

  const [collected, drag] = useDrag(
    () => ({
      type: "box",
      item: { id, left, top, title },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title]
  );

  return (
    <div style={getStyles(left, top, 100, 100)}>
      <Kotak title={title} />
    </div>
  );
};

export default KotakSoal;
