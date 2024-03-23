import React, {useEffect} from "react";
import Kotak from "./Kotak";
import { useDrag } from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";

const getStyles = (left, top, width, height, isDragging) => {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    width,
    height,
    opacity: isDragging ? 0 : 1,
  };
};

const KotakSoal = (props) => {
  const { id, title, left, top } = props;

  const [collected, drag, preview] = useDrag(
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
    <div
        ref={drag}
        style={getStyles(left, top, 100, 100, collected.isDragging)}
    >
      <Kotak title={title} />
    </div>
  );
};

export default KotakSoal;
