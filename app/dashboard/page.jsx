"use client";
import React from "react";
import { auth } from "../lib/firebase";

const DashboardPage = () => {
  const user = auth.currentUser;
  console.log({ user });

  return (
    <div>
      <div className="w-full h-72 bg-[url('/bg_dashboard.jpg')]">
        <div className="flex h-full items-center px-48 gap-4 bg-black/50">
          <img
            src={user.photoURL}
            width={128}
            alt=""
            className="rounded-full"
          />
          <div className="text-white">
            <h1 className="text-5xl font-semibold drop-shadow-xl">
              {user.displayName}
            </h1>
            <p className="text-2xl text-white/80">Dasbor Siswa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
