import React from "react";
import Card from "./Card";

const SimulasiPage = () => {
  return (
    <div>
      <div className="w-full h-72 bg-[url('/bg_dashboard.jpg')]">
        <div className="flex h-full items-center justify-center flex-col gap-4 bg-black/50">
          <img
            src={"/paper.svg"}
            width={128}
            alt=""
            className="rounded-full invert"
          />
          <div className="text-white">
            <h1 className="text-5xl font-semibold drop-shadow-xl">Simulasi</h1>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-16 flex-wrap p-16">
        <Card variant={"blue"} />
        <Card variant={"purple"} />
        <Card variant={"green"} />
        <Card variant={"red"} />
        <Card variant={"yellow"} />
        <Card variant={"cyan"} />
      </div>
    </div>
  );
};

export default SimulasiPage;
