"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openTujuan, setOpenTujuan] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  const themeToggle = () => {
    if (theme == "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      // languageIcon.setAttribute("class", "invers");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      // languageIcon.setAttribute("class", "");
    }
  };

  const changeTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
    themeToggle();
  };

  const openLink = (link) => {
    router.push(link);
    setOpenTujuan(false);
  };

  // useEffect(() => {
  //   if (theme !== "") {
  //     themeToggle();
  //   }
  // }, [theme]);
  return (
    <>
      <nav>
        <a href="/" className="flex gap-3 items-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={200}
            height={200}
            className="w-6 h-auto object-contain"
          />
          Logo
        </a>
        <ul className="menu">
          <li className="relative">
            <div
              className="flex items-center"
              onClick={() => setOpenTujuan((value) => !value)}
            >
              <Image
                src={"/paper.svg"}
                alt="paper"
                width={24}
                height={24}
                className="invert"
              />
              Tujuan Pembelajaran
            </div>
            <div
              className={`absolute top-12 z-10 w-36 bg-black rounded-xl ${
                openTujuan ? "" : "hilang"
              }`}
            >
              <div
                onClick={() => openLink("/tujuan_pembelajaran/lkpd")}
                className="py-2 px-4 hover:bg-white/20 rounded-lg transition-all flex items-center"
              >
                LKPD
              </div>
              <div
                onClick={() => openLink("/tujuan_pembelajaran/modul")}
                className="py-2 px-4 hover:bg-white/20 rounded-lg transition-all flex items-center"
              >
                Modul Ajar
              </div>
              <div
                onClick={() => openLink("/tujuan_pembelajaran/ppt")}
                className="py-2 px-4 hover:bg-white/20 rounded-lg transition-all flex items-center"
              >
                PPT
              </div>
            </div>
          </li>
          <li>
            <Link href={"/simulasi"} className="flex items-center">
              {" "}
              <Image
                src={"/paper.svg"}
                alt="paper"
                width={24}
                height={24}
                className="invert"
              />
              Simulasi
            </Link>
          </li>
          <li>
            <Link href={"/soal"} className="flex items-center">
              <Image
                src={"/paper.svg"}
                alt="paper"
                width={24}
                height={24}
                className="invert"
              />
              Soal
            </Link>
          </li>
          <li>
            <Link href={"/pembuat"} className="flex items-center">
              <Image
                src={"/paper.svg"}
                alt="paper"
                width={24}
                height={24}
                className="invert"
              />
              Pembuat
            </Link>
          </li>
        </ul>
        <div className="profile">
          <div
            className={`dropdown z-10 ${isDropdownOpen ? "" : "hilang"}`}
            id="dropdown"
          >
            <Link href="/masuk" className="dropdown-menu">
              <img src="./masuk.png" alt="" />
              <p>Masuk</p>
            </Link>
            <Link href="/signup" className="dropdown-menu">
              <img src="./profile.png" width="26" alt="" />
              <p>Buat Akun Baru</p>
            </Link>
            <div className="dropdown-menu">
              <img src="./theme.png" width="26" alt="" />
              Mode Gelap
              <form action="">
                <label className="switch">
                  <input
                    type="checkbox"
                    name="theme"
                    onChange={(e) => changeTheme(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </form>
            </div>
            <div
              className="dropdown-menu"
              id="ganti-bahasa"
              onClick={() => setIsLanguageOpen(true)}
            >
              <img src="./language.png" width="26" alt="" />
              Ganti Bahasa
              <img
                src="./indo.png"
                alt="logo bendera"
                width="32"
                id="current-language-icon"
              />
            </div>
          </div>
          <div
            id="setting-button"
            onClick={() => setIsDropdownOpen((value) => !value)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path d="M 9.6660156 2 L 9.1757812 4.5234375 C 8.3516137 4.8342536 7.5947862 5.2699307 6.9316406 5.8144531 L 4.5078125 4.9785156 L 2.171875 9.0214844 L 4.1132812 10.708984 C 4.0386488 11.16721 4 11.591845 4 12 C 4 12.408768 4.0398071 12.832626 4.1132812 13.291016 L 4.1132812 13.292969 L 2.171875 14.980469 L 4.5078125 19.021484 L 6.9296875 18.1875 C 7.5928951 18.732319 8.3514346 19.165567 9.1757812 19.476562 L 9.6660156 22 L 14.333984 22 L 14.824219 19.476562 C 15.648925 19.165543 16.404903 18.73057 17.068359 18.185547 L 19.492188 19.021484 L 21.826172 14.980469 L 19.886719 13.291016 C 19.961351 12.83279 20 12.408155 20 12 C 20 11.592457 19.96113 11.168374 19.886719 10.710938 L 19.886719 10.708984 L 21.828125 9.0195312 L 19.492188 4.9785156 L 17.070312 5.8125 C 16.407106 5.2676813 15.648565 4.8344327 14.824219 4.5234375 L 14.333984 2 L 9.6660156 2 z M 11.314453 4 L 12.685547 4 L 13.074219 6 L 14.117188 6.3945312 C 14.745852 6.63147 15.310672 6.9567546 15.800781 7.359375 L 16.664062 8.0664062 L 18.585938 7.40625 L 19.271484 8.5917969 L 17.736328 9.9277344 L 17.912109 11.027344 L 17.912109 11.029297 C 17.973258 11.404235 18 11.718768 18 12 C 18 12.281232 17.973259 12.595718 17.912109 12.970703 L 17.734375 14.070312 L 19.269531 15.40625 L 18.583984 16.59375 L 16.664062 15.931641 L 15.798828 16.640625 C 15.308719 17.043245 14.745852 17.36853 14.117188 17.605469 L 14.115234 17.605469 L 13.072266 18 L 12.683594 20 L 11.314453 20 L 10.925781 18 L 9.8828125 17.605469 C 9.2541467 17.36853 8.6893282 17.043245 8.1992188 16.640625 L 7.3359375 15.933594 L 5.4140625 16.59375 L 4.7285156 15.408203 L 6.265625 14.070312 L 6.0878906 12.974609 L 6.0878906 12.972656 C 6.0276183 12.596088 6 12.280673 6 12 C 6 11.718768 6.026742 11.404282 6.0878906 11.029297 L 6.265625 9.9296875 L 4.7285156 8.59375 L 5.4140625 7.40625 L 7.3359375 8.0683594 L 8.1992188 7.359375 C 8.6893282 6.9567546 9.2541467 6.6314701 9.8828125 6.3945312 L 10.925781 6 L 11.314453 4 z M 12 8 C 9.8034768 8 8 9.8034768 8 12 C 8 14.196523 9.8034768 16 12 16 C 14.196523 16 16 14.196523 16 12 C 16 9.8034768 14.196523 8 12 8 z M 12 10 C 13.111477 10 14 10.888523 14 12 C 14 13.111477 13.111477 14 12 14 C 10.888523 14 10 13.111477 10 12 C 10 10.888523 10.888523 10 12 10 z"></path>
            </svg>
          </div>
        </div>
      </nav>
      <div
        className={`pilih-bahasa ${isLanguageOpen ? "" : "hilang"}`}
        id="pilih-bahasa"
      >
        <div id="close-bahasa" onClick={() => setIsLanguageOpen(false)}>
          X
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src="./language.png"
            alt=""
            width="32"
            id="language-icon"
            className={`${theme == "light" ? "" : "invers"}`}
          />
          <h1>Ganti Bahasa</h1>
        </div>
        <div>
          <div className="bahasa" id="bahasa-indonesia">
            <img
              src="./indo.png"
              alt=""
              width="24"
              height="24"
              style={{ objectFit: "contain" }}
            />
            <p>Bahasa Indonesia</p>
          </div>
          <div className="bahasa" id="bahasa-english">
            <img src="./english.png" alt="" width="24" height="24" />
            <p>English</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
