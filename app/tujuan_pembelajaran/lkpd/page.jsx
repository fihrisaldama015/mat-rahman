import React from "react";

const lkpd = () => {
  return (
    <div className="flex flex-col flex-1 p-3 bg-slate-200">
      <h1 className="mb-3 text-2xl font-semibold text-center">LKPD</h1>
      <div className="flex flex-1">
        <iframe
          id="lkpd"
          title="lkpd"
          width="300"
          height="200"
          className="w-full h-auto rounded-xl"
          src="/assets/lkpd.pdf"
        ></iframe>
      </div>
    </div>
  );
};

export default lkpd;
