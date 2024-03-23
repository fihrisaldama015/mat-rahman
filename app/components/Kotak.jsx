import React from "react";
import Latex from "react-latex-next";

const styles = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  cursor: "move",
};

const Kotak = ({ title }) => {
  let width = 0;
  let height = 0;
  let backgroundColor = "";
  if (title == "X^2") {
    width = 4;
    height = 4;
    backgroundColor = "bg-blue-500";
  } else if (title == "X") {
    width = 4;
    height = 2;
    backgroundColor = "bg-green-500";
  } else if (title == "1") {
    width = 2;
    height = 2;
    backgroundColor = "bg-orange-500";
  }

  const widthFromSize = `${width}rem`;
  const heightFromSize = `${height}rem`;
  return (
    <div
      className={`flex flex-col text-white font-bold items-center justify-center ${backgroundColor}`}
      style={{
        ...styles,
        width: widthFromSize,
        height: heightFromSize,
      }}
    >
      <Latex>${title}$</Latex>
    </div>
  );
};

export default Kotak;
