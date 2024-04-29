import { useDrag } from "react-dnd";
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
      style={getStyles(left, top, collected.isDragging)}
      className="transition-all duration-1000"
    >
      <Kotak title={title} />
    </div>
  );
};

export default KotakSoal;
