import { useDrag } from "react-dnd";
import { useEffect, useState } from "react";
import Kotak from "./Kotak";

const getStyles = (left, top, isDragging) => {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0.2 : 1,
  };
};

const KotakSoal = (props) => {
  const { id, title, left, top, setIsDrag } = props;
  const [isDragging, setIsDragging] = useState(false);

  const [collected, drag, preview] = useDrag(
      () => ({
        type: "box",
        item: { id, left, top, title },
        collect: (monitor) => {
          return {
            isDragging: monitor.isDragging(),
          };
        },
      }),
      [id, left, top, title]
  );

  useEffect(() => {
    setIsDrag(isDragging);
  }, [isDragging]);

  useEffect(() => {
    setIsDragging(collected.isDragging);
  }, [collected]);

  return (
      <div
          ref={drag}
          style={getStyles(left, top, collected.isDragging)}
          className="transition-all duration-1000"
      >
        <Kotak title={title} />
      </div>
  );
};

export default KotakSoal;
