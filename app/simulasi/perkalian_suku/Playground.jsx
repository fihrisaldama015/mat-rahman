"use client";
import KotakSoal from "@/app/components/KotakSoal";
import LokasiKotak from "@/app/components/LokasiKotak";
import { snapToGrid } from "@/app/components/snapToGrid";
import {
  getEquation,
  getEquationPenjabaran,
} from "@/app/simulasi/perkalian_suku/getEquation";
import update from "immutability-helper";
import { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import Latex from "react-latex-next";
import DeleteButton from "@/app/simulasi/perkalian_suku/DeleteButton";

const styles = {
  width: "50%",
  height: "100%",
  position: "relative",
};
const LIST_SOAL = [
  "x^2 + 3x + 2",
  "x^2 + 5x + 6",
  "x^2 + 7x + 10",
  "x^2 + 8x + 12",
  "x^2 + 10x + 25",
];

const Playground = ({ isSnapToGrid }) => {
  const [soal, setSoal] = useState(LIST_SOAL[0]);
  const [noSoal, setNoSoal] = useState(1);
  const [result, setResult] = useState({});
  const [kotak, setKotak] = useState({});
  const [panjang, setPanjang] = useState("");
  const [lebar, setLebar] = useState("");
  const [bentuk, setBentuk] = useState("");
  const [akar_1, setAkar_1] = useState("");
  const [akar_2, setAkar_2] = useState("");
  const [statusJawaban, setStatusJawaban] = useState({
    type: "",
    isBenar: false,
  });
  const [showEmoticon, setShowEmoticon] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [isLongPress, setLongPress] = useState(null);
  const listKotak = {
    a: { title: "X^2", left: 112 + 0, top: 128 },
    b: { title: "X", left: 112 + 128 + 16, top: 128 },
    c: { title: "1", left: 112 + 128 + 64 + 32, top: 128 },
    d: { title: "-X", left: 112 + -64 - 16, top: 128 },
    e: { title: "-1", left: 112 + 128 + 64 + 64 + 48, top: 128 },
    f: { title: "X ", left: 112 + 128 + 64 + 64 + 64 + 64, top: 128 },
  };
  let audioHappy =
    typeof Audio !== "undefined" ? new Audio("/audio/yay.mp3") : undefined;
  let audioSad =
    typeof Audio !== "undefined" ? new Audio("/audio/sad.mp3") : undefined;

  const checkAnswer = () => {
    if (
      getEquationPenjabaran(
        result.EqX,
        result.EqX2,
        result.EqConst,
        result.EqConst2
      ) == soal
    ) {
      setStatusJawaban({
        type: "bentuk",
        isBenar: true,
      });
      setShowEmoticon(true);
      audioHappy.play();
    } else {
      setStatusJawaban({
        type: "bentuk",
        isBenar: false,
      });
      setShowEmoticon(true);
      audioSad.play();
      setShowTryAgain(true);
    }
  };

  const checkPerhitungan = () => {
    const panjangString = `${result.EqX > 1 ? result.EqX : ""}x+${
      result.EqConst
    }`;
    const lebarString = `${result.EqX2 > 1 ? result.EqX2 : ""}x+${
      result.EqConst2
    }`;
    const himpunanPenyelesaian1 = `${
      result.EqConst > 0 ? "-" + result.EqConst : result.EqConst.substring(1)
    }`;
    const himpunanPenyelesaian2 = `${
      result.EqConst2 > 0 ? "-" + result.EqConst2 : result.EqConst2.substring(1)
    }`;
    console.log(himpunanPenyelesaian1);
    console.log(himpunanPenyelesaian2);
    if (
      panjangString == panjang.toLowerCase() &&
      lebarString == lebar.toLowerCase()
    ) {
      if (
        himpunanPenyelesaian1 == akar_1.toLowerCase() &&
        himpunanPenyelesaian2 == akar_2.toLowerCase()
      ) {
        setStatusJawaban({
          type: "akar",
          isBenar: true,
        });
        audioHappy.play();
      } else {
        setStatusJawaban({
          type: "akar",
          isBenar: false,
        });
        audioSad.play();
        setShowTryAgain(true);
      }
      setShowEmoticon(true);
    } else {
      setStatusJawaban({
        type: "ukuran",
        isBenar: false,
      });
      setShowEmoticon(true);
      audioSad.play();
      setShowTryAgain(true);
    }
  };

  useEffect(() => {
    if (showEmoticon) {
      setTimeout(() => {
        setShowEmoticon(false);
      }, 5000);
    }
  }, [showEmoticon]);

  const addMultipleBoxes = (number, title, left, top) => {
    let newKotak = { ...kotak };
    for (let i = 1; i <= number; i++) {
      const id = (Math.random() * i).toString(36).substring(7) + i;
      newKotak[id] = {
        title: title,
        left: left + 64 + 16,
        top: top + 128,
      };
    }
    setKotak(newKotak);
  };

  useEffect(() => {
    // Long press is triggered
    if (isLongPress !== null && typeof window !== "undefined") {
      const prompt = window.prompt("Please enter how many block you want", 1);
      const number = parseInt(prompt, 10);
      if (prompt !== null && !isNaN(number) && number > 0) {
        addMultipleBoxes(
          number,
          isLongPress.title,
          isLongPress.left,
          isLongPress.top
        );
      }
    }
    setLongPress(null);
  }, [isLongPress]);

  const tryAgain = () => {
    setShowEmoticon(false);
    if (statusJawaban.type == "bentuk") {
      setKotak({});
    } else if (statusJawaban.type == "ukuran") {
      setPanjang("");
      setLebar("");
      setAkar_1("");
      setAkar_2("");
      setStatusJawaban({
        type: "bentuk",
        isBenar: true,
      });
    } else if (statusJawaban.type == "akar") {
      setAkar_1("");
      setAkar_2("");
      setStatusJawaban({
        type: "bentuk",
        isBenar: true,
      });
    }
    setShowTryAgain(false);
  };

  const soalSelanjutnya = () => {
    if (noSoal == LIST_SOAL.length) {
      alert("Kamu telah menyelesaikan semua soal");
    } else {
      setNoSoal((value) => value + 1);
      setSoal(LIST_SOAL[noSoal]);
      reset();
    }
  };

  const reset = () => {
    setShowEmoticon(false);
    setKotak({});
    setPanjang("");
    setLebar("");
    setAkar_1("");
    setAkar_2("");
    setStatusJawaban({
      type: "",
      isBenar: false,
    });
    setShowTryAgain(false);
    setBentuk("");
  };

  const addBox = (id, title, left, top) => {
    setKotak(
      update(kotak, {
        [id]: {
          $set: { title, left, top },
        },
      })
    );
  };

  const moveBox = (id, left, top) => {
    setKotak(
      update(kotak, {
        [id]: {
          $merge: { left, top },
        },
      })
    );
  };

  const dropRef = useRef(null);
  const [, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        setIsDrag(false);
        if (item && monitor && delta) {
          let left = Math.round(item.left + delta.x);
          let top = Math.round(item.top + delta.y);
          if (isSnapToGrid) {
            [left, top] = snapToGrid(left, top);
          }
          // Get the bounding rectangle of the drop area
          let dropAreaRect = null;
          if (dropRef.current) {
            dropAreaRect = dropRef.current.getBoundingClientRect();
          } else {
            // Handle the case when dropRef.current is null
            // For example, you can return from the function
            return;
          }
          // Check if the drop location is within the bounds of the drop area
          if (
            left < dropAreaRect.left ||
            top < dropAreaRect.top ||
            left > dropAreaRect.right ||
            top > dropAreaRect.bottom
          ) {
            // If not, return without calling addBox
            return;
          }
          moveBox(item.id, left, top);
          return undefined;
        }
      },
    }),
    [moveBox]
  );

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);
  useEffect(() => {
    setResult(getEquation(kotak));
  }, [kotak]);

  const deleteBox = (id) => {
    setKotak((prevKotak) => {
      const newKotak = { ...prevKotak };
      delete newKotak[id];
      return newKotak;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-t from-emerald-50 to-emerald-200">
      <div className="flex flex-col flex-1 justify-between">
        {/* <div
          className="absolute flex flex-col gap-3 items-center text-black transition-all duration-1000 -translate-y-1/2"
          style={{
            top: "8rem",
            right: "10%",
          }}
        >
          <div className="px-3 py-2 bg-white rounded-xl shadow-xl ring-1">
            Soal
          </div>
          <h1 className="text-3xl">
            <Latex>$x^2+2x+1$</Latex>
          </h1>
          <h1 className="text-3xl">
            <Latex>
              $
              {getPenjabaran(
                result.EqX,
                result.EqX2,
                result.EqConst,
                result.EqConst2
              )}
              $
            </Latex>
            <br />
            <Latex>
              $
              {getEquationPenjabaran(
                result.EqX,
                result.EqX2,
                result.EqConst,
                result.EqConst2
              )}
              $
            </Latex>
          </h1>
        </div> */}
        <div
          className="absolute flex flex-row gap-3 items-start text-black transition-all duration-1000 -translate-y-1/2 p-6 rounded-xl"
          style={{
            top: "8rem",
            right: "10%",
          }}
        >
          <div className="mr-24 tracking-widest flex flex-col items-center gap-6">
            <p>No</p>
            <h1 className="text-4xl">
              {noSoal} / {LIST_SOAL.length}
            </h1>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="px-3 py-2 bg-white rounded-xl shadow-xl ring-1">
              Soal
            </div>
            <h1 className="text-3xl">
              <div className="bg-white rounded-lg px-3 py-1 ring-1 text-3xl font-semibold">
                <Latex>${soal}$</Latex>
              </div>
            </h1>
          </div>
        </div>

        <div
          ref={dropRef}
          style={styles}
          className="transition-all bg-white rounded-xl"
        >
          <div className="absolute text-black transition-all duration-1000 top-4 right-4">
            <button
              className="absolute py-3 px-10 top-0 right-0 bg-red-500 font-bold text-sm rounded-xl  text-white hover:bg-red-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </button>
          </div>
          <DeleteButton onDelete={deleteBox} isDragging={isDrag} />
          <div
            className="absolute"
            style={{
              left: 0,
              top: 0,
            }}
          >
            <div className="relative">
              <div className="animate-popup" style={{ display: "block" }}>
                {/* VERTIKAL */}
                <div className="absolute translate-y-24 translate-x-4 w-0.5 h-[22rem] bg-black"></div>
                <div className="absolute translate-y-24 translate-x-8 h-[22rem] w-[4rem] flex items-center ">
                  <div
                    className={`absolute -rotate-90 -translate-x-36 flex flex-row items-center justify-center gap-2 w-[22rem] h-[4rem] ${
                      statusJawaban.type == "ukuran" &&
                      !statusJawaban.isBenar &&
                      "text-red-500 text-xl font-bold"
                    }`}
                  >
                    <Latex>$Lebar = $</Latex>
                    <Latex>$ {lebar}$</Latex>
                  </div>
                </div>
                {/* HORIZONTAL */}
                <div className="absolute translate-y-4 translate-x-24 w-[28rem] h-0.5 bg-black"></div>
                <div className="absolute translate-y-8 translate-x-24 w-[28rem]">
                  <div
                    className={`w-full flex flex-row gap-2 items-center justify-center ${
                      statusJawaban.type == "ukuran" &&
                      !statusJawaban.isBenar &&
                      "text-red-500 text-xl font-bold"
                    }`}
                  >
                    <Latex>$Panjang = $</Latex>
                    <Latex>$ {panjang}$</Latex>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {Object.keys(kotak).map((key) => (
            <KotakSoal
              key={key}
              id={key}
              {...kotak[key]}
              setIsDrag={setIsDrag}
            />
          ))}
        </div>
        <div
          className="absolute right-16 items-center h-full animate-popup"
          style={{
            display: true ? "flex" : "none",
            // pointerEvents: isBentukBenar ? "auto" : "none",
          }}
        >
          <div className="flex flex-row items-start gap-4 p-6">
            <div className="flex flex-col items-start gap-4">
              <div
                className=" flex-col items-center gap-4"
                style={{
                  display: true ? "flex" : "none",
                }}
              >
                {/* <h1 className="text-2xl font-medium">.</h1> */}
                <div className="flex items-center gap-2">
                  <Latex>$P = $</Latex>
                  <div className="relative bg-white rounded-lg w-24 h-10 px-3 py-1 ring-1 text-lg">
                    <Latex className="pointer-events-none">${panjang} $</Latex>
                    <input
                      type="text"
                      value={panjang}
                      className={`absolute left-0 top-0 px-3 py-1 z-10 bg-transparent focus:outline-none ${
                        panjang.length > 0
                          ? "text-transparent w-fit tracking-widest text-2xl"
                          : "text-black w-24"
                      }`}
                      onChange={(e) => setPanjang(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Latex>$L = $</Latex>
                  <div className="relative bg-white rounded-lg w-24 h-10 pl-3 pr-3 py-1 ring-1 text-lg">
                    <Latex>${lebar} $</Latex>
                    <input
                      type="text"
                      value={lebar}
                      className={`absolute left-0 top-0 pl-3 pr-3 py-1 z-10 w-24 bg-transparent focus:outline-none ${
                        lebar.length > 0
                          ? "text-transparent w-fit tracking-widest text-2xl"
                          : "text-black w-24"
                      }`}
                      onChange={(e) => setLebar(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <select
                name="bentuk"
                id="bentuk"
                value={bentuk}
                className="p-2 bg-white rounded-lg ring-1 text-lg w-48"
                onChange={(e) => setBentuk(e.target.value)}
              >
                <option value="" selected>
                  Pilih Bentuk
                </option>
                <option value="persegi">Persegi</option>
                <option value="persegi_panjang">Persegi Panjang</option>
              </select>
              <div
                className=" items-center gap-2 text-sm font-medium animate-popup"
                style={{ display: bentuk != "" ? "flex" : "none" }}
              >
                Luas =
                <div className="bg-white text-sm rounded-lg px-3 py-1 ring-1">
                  <Latex>
                    ${bentuk == "persegi" ? "sisi.sisi" : "panjang.lebar"}$
                  </Latex>
                </div>
              </div>
              <div
                className="flex items-center gap-2 font-medium text-lg animate-popup"
                style={{ display: bentuk != "" ? "flex" : "none" }}
              >
                0 =
                <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                  <Latex>
                    $({panjang})({lebar})$
                  </Latex>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div
                className="flex-col items-start gap-4 animate-popup"
                style={{
                  display: bentuk != "" ? "flex" : "none",
                }}
              >
                {/* <h2 className="text-2xl font-medium">Akar</h2> */}
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                    <Latex>${panjang} = 0$</Latex>
                  </div>
                  <span className="text-lg">
                    <Latex>$\vee$</Latex>
                  </span>
                  <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                    <Latex>${lebar} = 0$</Latex>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Latex>$x_{1} = $</Latex>
                    <div className="relative bg-white rounded-lg w-24 h-10 px-3 py-1 ring-1 text-lg">
                      <Latex>${akar_1} $</Latex>
                      <input
                        type="text"
                        value={akar_1}
                        className={`absolute left-0 top-0 px-3 py-1 z-10 w-24 bg-transparent focus:outline-none ${
                          akar_1.length > 0
                            ? "text-transparent w-fit tracking-widest text-2xl"
                            : "w-8"
                        }`}
                        onChange={(e) => setAkar_1(e.target.value)}
                      />
                    </div>
                  </div>

                  <span className="text-lg">
                    <Latex>$\vee$</Latex>
                  </span>
                  <div className="flex items-center gap-2">
                    <Latex>$x_{2} = $</Latex>
                    <div className="relative bg-white rounded-lg w-24 h-10 px-3 py-1 ring-1 text-lg">
                      <Latex>${akar_2} $</Latex>
                      <input
                        type="text"
                        value={akar_2}
                        className={`absolute left-0 top-0 px-3 py-1 z-10 w-24 bg-transparent focus:outline-none ${
                          akar_2.length > 0
                            ? "text-transparent w-fit tracking-widest text-2xl"
                            : "w-8"
                        }`}
                        onChange={(e) => setAkar_2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-lg px-3 py-1 ring-1 text-lg animate-popup"
                style={{
                  display: bentuk != "" ? "block" : "none",
                }}
              >
                <Latex>
                  $Hp = ${"{"}$ {akar_1} {akar_2 ? "," : ""} {akar_2} $ {"}"}
                </Latex>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-48 pl-48 w-full flex justify-start bg-emerald-900/20 text-black">
        <div className="w-[300px] mt-8 -translate-y-32 -translate-x-32">
          {Object.keys(listKotak).map((key) => (
            <LokasiKotak
              setLongPress={setLongPress}
              key={key}
              id={key}
              {...listKotak[key]}
              onClick={() =>
                addBox(
                  Math.random().toString(36).substring(7),
                  listKotak[key].title,
                  listKotak[key].left + 64 + 16,
                  listKotak[key].top
                )
              }
            />
          ))}
        </div>
        {showEmoticon && (
          <div className="absolute top-8 right-96 rounded-xl text-white cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0">
            <div className="relative">
              {statusJawaban.isBenar == false && (
                <div className="absolute -top-32 right-0 p-3 h-fit w-64 rounded-lg text-lg ring-1 ring-slate-300 bg-white text-black animate-popup transition-all">
                  {statusJawaban.type == "bentuk"
                    ? "Bentuk yang kamu buat masih salah, coba ulang kembali"
                    : statusJawaban.type == "ukuran"
                    ? "Panjang atau Lebar masih salah, coba hitung kembali"
                    : "Himpunan penyelesaian masih salah, coba hitung kembali"}
                </div>
              )}
              {statusJawaban.isBenar == true && (
                <div className="absolute -top-32 right-0 p-3 h-fit w-64 rounded-lg text-lg ring-1 ring-slate-300 bg-white text-black animate-popup transition-all">
                  {statusJawaban.type == "bentuk"
                    ? "Kerja Bagus, bentuk yang kamu buat sudah benar, sekarang hitung panjang lebarnya!"
                    : statusJawaban.type == "akar" &&
                      "Kerja Bagus, Himpunan penyelesaian sudah benar, sekarang lanjut ke soal selanjutnya!"}
                </div>
              )}
            </div>
            <div className="font-bold text-6xl animate-popup transition-all">
              {statusJawaban.isBenar ? "🥳" : "😢"}
            </div>
          </div>
        )}
        {statusJawaban.isBenar == true ? (
          statusJawaban.type == "akar" ? (
            <button
              className="absolute top-8 right-32 bg-blue-500 font-bold text-lg rounded-xl py-6 px-12  text-white hover:bg-blue-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
              onClick={() => {
                soalSelanjutnya();
              }}
            >
              {noSoal == LIST_SOAL.length ? "Selesai" : "Lanjut"}
            </button>
          ) : (
            <button
              className="absolute top-8 right-32 bg-yellow-500 font-bold text-lg rounded-xl py-6 px-12  text-white hover:bg-yellow-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
              onClick={() => {
                checkPerhitungan();
              }}
              disabled={akar_1 == "" && akar_2 == ""}
            >
              Cek Akar
            </button>
          )
        ) : showTryAgain ? (
          <button
            className="absolute top-8 right-32 bg-red-500 font-bold text-lg rounded-xl py-6 px-12  text-white hover:bg-red-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
            onClick={() => {
              tryAgain();
            }}
          >
            Coba Lagi
          </button>
        ) : (
          <button
            className="absolute top-8 right-32 bg-green-500 font-bold text-lg rounded-xl py-6 px-12  text-white hover:bg-green-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
            onClick={() => {
              checkAnswer();
            }}
            disabled={Object.keys(kotak).length < 1}
          >
            Cek Bentuk
          </button>
        )}
      </div>
    </div>
  );
};

export default Playground;
