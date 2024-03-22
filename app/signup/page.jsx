"use client";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../lib/firebase";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ttl, setTtl] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await setDoc(doc(db, "users", email), {
        nama,
        email,
        password,
        ttl,
      });
      alert("berhasil daftar");
      router.push("/masuk");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <div class="hero-banner">
        <h1>Buat Akun Baru</h1>
      </div>
      <form
        action=""
        class="form"
        id="form-pendaftaran-murid"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            id="nama"
            placeholder="Masukkan Nama"
            class="input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
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
        <div>
          <input
            type="date"
            class="input"
            id="ttl"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
          />
        </div>
        <button type="submit">Daftar Sebagai Murid</button>
      </form>
    </>
  );
};

export default SignUpPage;
