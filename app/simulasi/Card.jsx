"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Latex from "react-latex-next";

const Card = ({ variant, title, penjelasan, rumus, id }) => {
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
      ? "bg-orange-500"
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
      ? "text-orange-500"
      : variant == "cyan"
      ? "text-cyan-500"
      : "";
  return (
    <div className={`relative pb-16 flex flex-col w-80 rounded-xl ${color}`}>
      <Image
        src={"/bg_dashboard.jpg"}
        alt="card"
        width={200}
        height={200}
        className="w-full h-40 rounded-t-xl"
      />

      <div className="p-8 text-white">
        <h1 className="text-lg font-bold text-center">{title}</h1>
        <p className="text-justify mt-6">
          {penjelasan}
          <br />
          {rumus && <Latex>${rumus}</Latex>}
        </p>
      </div>

      <Link href={`/simulasi/${id}`}>
        <button
          className={`mb-4 mt-8 absolute left-1/2 -translate-x-1/2 bottom-0 px-8 py-2 bg-white ${textColor} rounded-full hover:scale-110 transition-all mx-auto font-semibold`}
        >
          Bermain
        </button>
      </Link>
    </div>
  );
};

export default Card;
