"use client";
import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth, db, provider } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("berhasil masuk");
    } catch (error) {
      console.log({ error });
    }
  };

  const loginWithGoogle = async () => {
    console.log("test");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;
      console.log(email);

      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        alert("Selamat datang " + docSnap.data().nama);
        router.push("/dashboard");
      } else {
        alert("Anda belum terdaftar");
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      console.log({ result });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <div className="w-full h-72 bg-[url('/bg_dashboard.jpg')]">
        <div className="flex h-full items-center justify-center flex-col gap-4 bg-black/50">
          <div className="text-white">
            <h1 className="text-5xl font-semibold drop-shadow-xl">Masuk</h1>
          </div>
        </div>
      </div>

      <div className="py-8 flex items-center justify-center">
        <button
          type="button"
          className="flex items-center gap-2 bg-white px-8 py-2 text-black rounded-3xl hover:scale-110 transition-all"
          onClick={loginWithGoogle}
        >
          <img src="/google.png" width={16} alt="" />
          <p>Google</p>
        </button>
      </div>

      <form
        action=""
        class="form"
        id="form-pendaftaran-murid"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="email"
            id="email"
            placeholder="Masukkan Email"
            class="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Masukkan Password"
            class="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Masuk</button>
      </form>
    </div>
  );
};

export default LoginPage;
