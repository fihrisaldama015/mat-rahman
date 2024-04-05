import React from "react";
import Latex from "react-latex-next";

const styles = {
  border: "1px solid gray",
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
    backgroundColor = "bg-blue-600";
  } else if (title == "X") {
    width = 2;
    height = 4;
    backgroundColor = "bg-green-600";
  } else if (title == "1") {
    width = 2;
    height = 2;
    backgroundColor = "bg-orange-600";
  } else if (title == "X ") {
    width = 4;
    height = 2;
    backgroundColor = "bg-green-600";
  } else if (title == "-X") {
    width = 2;
    height = 4;
    backgroundColor = "bg-red-600";
  } else if (title == "-X ") {
    width = 4;
    height = 2;
    backgroundColor = "bg-red-600";
  } else if (title == "-1") {
    width = 2;
    height = 2;
    backgroundColor = "bg-yellow-600";
  }

  const widthFromSize = `${width * 2}rem`;
  const heightFromSize = `${height * 2}rem`;
  return (
    <div
      className={`flex flex-col animate-popup text-white font-bold items-center justify-center hover:border-2 hover:border-solid hover:border-black ${backgroundColor}`}
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
