import Image from "next/image";
import React from "react";

const Card = ({ variant }) => {
  const color =
    variant == "blue"
      ? "bg-blue-500"
      : variant == "red"
      ? "bg-red-500"
      : variant == "green"
      ? "bg-green-500"
      : variant == "purple"
      ? "bg-purple-500"
      : variant == "yellow"
      ? "bg-yellow-500"
      : variant == "cyan"
      ? "bg-cyan-500"
      : "";

  const textColor =
    variant == "blue"
      ? "text-blue-500"
      : variant == "red"
      ? "text-red-500"
      : variant == "green"
      ? "text-green-500"
      : variant == "purple"
      ? "text-purple-500"
      : variant == "yellow"
      ? "text-yellow-500"
      : variant == "cyan"
      ? "text-cyan-500"
      : "";
  return (
    <div className={`flex flex-col w-80 rounded-xl ${color}`}>
      <Image
        src={"/bg_dashboard.jpg"}
        alt="card"
        width={200}
        height={200}
        className="w-full h-40 rounded-t-xl"
      />

      <div className="p-8 text-white">
        <h1 className="text-lg font-bold">Garis Waktu Matematika</h1>
        <p className="text-justify mt-6">
          Jelajahi waktu dan jelajahi ahli matematika terbesar dan penemuan
          matematika terbesar dalam sejarah.
        </p>
      </div>
      <button
        className={`mb-4 mt-8 px-8 py-2 bg-white ${textColor} rounded-full hover:scale-110 transition-all mx-auto font-semibold`}
      >
        Bermain
      </button>
    </div>
  );
};

export default Card;
