"use client";
import KotakSoal from "@/app/components/KotakSoal";
import LokasiKotak from "@/app/components/LokasiKotak";
import update from "immutability-helper";
import { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { snapToGrid } from "@/app/components/snapToGrid";
import Latex from "react-latex-next";
import useScreenSize from "@/app/utils/useScreenSize";

const styles = {
  width: "100%",
  height: "100%",
  border: "1px solid gray",
  position: "relative",
};

const NORMAL_BOX_WIDTH = 64;
const BIG_BOX_WIDTH = 2 * NORMAL_BOX_WIDTH;
const BOX_TOP = 192;
const GAP = 32;
const TOTAL_STEP = 13;
const SOAL = "x^2 + 3x + 2";

const Playground = ({ isSnapToGrid }) => {
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState(false);
  const [previewPL, setPreviewPL] = useState(false);
  const [previewHasil, setPreviewHasil] = useState({
    display: false,
    step: 0,
  });
  const [kotak, setKotak] = useState({});
  const listKotak = {
    a: { title: "X^2", left: 0, top: 0 },
    b: { title: "X", left: 128 + 16, top: 0 },
    c: { title: "1", left: 128 + 64 + 32, top: 0 },
    // d: { title: "X ", left: 128 + 16, top: 0 },
  };

  const screenSize = useScreenSize();
  let BOX_LEFT =
    Math.round(screenSize.width / 2 / 32) * 32 -
    (BIG_BOX_WIDTH + NORMAL_BOX_WIDTH) / 2;

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
      },
    }),
    [moveBox]
  );

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-1 justify-between bg-white">
        <div
          className="absolute flex flex-col gap-3 items-center text-black bg-white   transition-all duration-1000 -translate-y-1/2"
          style={{
            top: step > 0 ? "8rem" : "50%",
            transform: previewHasil.display
              ? "translateX(0) translateY(-50%)"
              : "translateX(-50%) translateY(-50%)",
            left: previewHasil.display ? "20%" : "50%",
          }}
        >
          <div className="px-3 py-2 rounded-xl shadow-xl ring-1">Soal</div>
          <h1 className="text-3xl">
            <Latex>$x^2 + 2x + 1$</Latex>
          </h1>
        </div>

        <div ref={dropRef} style={styles} className="transition-all">
          <div
            className="absolute text-black transition-all duration-1000"
            style={{
              left: step >= 9 ? BIG_BOX_WIDTH * 2 : BOX_LEFT,
              top: BOX_TOP,
            }}
          >
            <div
              className="relative animate-popup"
              style={{ display: preview ? "block" : "none" }}
            >
              {/* HORIZONTAL */}
              <div className="absolute -translate-y-8 w-[128px]">
                <div className="w-full flex flex-col items-center justify-center">
                  <Latex>$x$</Latex>
                  <div className="bg-black translate-y-0 w-3/4 h-[1px]"></div>
                </div>
              </div>
              <div className="absolute w-[64px] translate-x-[128px] -translate-y-8">
                <div className="w-full flex flex-col items-center justify-center">
                  <Latex>$1$</Latex>
                  <div className="bg-black translate-y-0 w-3/4 h-[1px]"></div>
                </div>
              </div>
              {/* HORIZONTAL */}
              {/* VERTIKAL */}
              <div className="absolute translate-y-[128px] -translate-x-8 h-[64px] flex items-center">
                <div className="-rotate-90">
                  <Latex>$1$</Latex>
                </div>
                <div className="bg-black translate-x-4 h-3/4 w-[1px]"></div>
              </div>
              <div className="absolute -translate-x-8 h-32 flex items-center">
                <div className="-rotate-90">
                  <Latex>$x$</Latex>
                </div>
                <div className="bg-black translate-x-1 h-3/4 w-[1px]"></div>
              </div>
              {/* VERTIKAL */}
            </div>
            <div
              className="relative animate-popup"
              style={{ display: previewPL ? "block" : "none" }}
            >
              {/* HORIZONTAL */}
              <div className="absolute -translate-y-8 w-[192px]">
                <div className="w-full flex flex-col items-center justify-center">
                  <Latex>$P = x + 1$</Latex>
                </div>
              </div>

              {/* VERTIKAL */}
              <div className="absolute -translate-x-16 h-48 flex items-center">
                <div className="-rotate-90 w-max">
                  <Latex>$L = x + 1$</Latex>
                </div>
              </div>
            </div>
          </div>
          {Object.keys(kotak).map((key) => (
            <KotakSoal key={key} id={key} {...kotak[key]} />
          ))}
          <div
            className="absolute right-16 items-center h-full animate-popup"
            style={{ display: previewHasil.display ? "flex" : "none" }}
          >
            <div className="flex flex-row items-start gap-4 p-6 bg-slate-100 rounded-xl shadow-xl ring-1 ring-slate-300">
              <div className="flex flex-col items-start gap-4">
                <div
                  className=" flex-col items-center gap-4"
                  style={{
                    display: previewHasil.step > 0 ? "flex" : "none",
                  }}
                >
                  <h1 className="text-2xl font-medium">Hasil</h1>
                  <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                    <Latex>$P = x + 1$</Latex>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                    <Latex>$L = x + 1$</Latex>
                  </div>
                </div>
                <div
                  className=" items-center gap-2 font-medium animate-popup"
                  style={{ display: previewHasil.step > 1 ? "flex" : "none" }}
                >
                  Luas Persegi Panjang =
                  <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                    <Latex>$P . L$</Latex>
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 font-medium text-lg animate-popup"
                  style={{ display: previewHasil.step > 2 ? "flex" : "none" }}
                >
                  0 =
                  <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                    <Latex>$(x+1)(x+1)$</Latex>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4">
                <div
                  className="flex-col items-start gap-4 animate-popup"
                  style={{
                    display: previewHasil.step > 3 ? "flex" : "none",
                  }}
                >
                  <h2 className="text-2xl font-medium">Akar</h2>
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                      <Latex>$x+1 = 0$</Latex>
                    </div>
                    <span className="text-lg">
                      <Latex>$\vee$</Latex>
                    </span>
                    <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                      <Latex>$x+1 = 0$</Latex>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                      <Latex>$x_{1} = -1$</Latex>
                    </div>
                    <span className="text-lg">
                      <Latex>$\vee$</Latex>
                    </span>
                    <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                      <Latex>$x_{2} = -1$</Latex>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-white rounded-lg px-3 py-1 ring-1 text-lg animate-popup"
                  style={{
                    display: previewHasil.step > 4 ? "block" : "none",
                  }}
                >
                  <Latex>
                    $Hp = ${"{"}$ -1, -1 $ {"}"}
                  </Latex>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-48 w-full flex justify-center bg-slate-300 text-black">
        <div className="w-[300px] mt-8">
          {Object.keys(listKotak).map((key) => (
            <LokasiKotak
              key={key}
              id={key}
              {...listKotak[key]}
              onClick={() =>
                addBox(
                  Math.random().toString(36).substring(7),
                  listKotak[key].title,
                  listKotak[key].left,
                  listKotak[key].top
                )
              }
            />
          ))}
        </div>
        <button
          className="absolute bg-red-500 ring-1 ring-red-600 rounded-xl py-6 px-12 left-16 top-8 text-white hover:bg-red-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
          onClick={() => {
            setStep((prev) => {
              kondisiPerStep(prev - 1);
              return prev - 1;
            });
          }}
          disabled={step == 0}
        >
          Prev
        </button>
        <button
          className="absolute bg-green-500 ring-1 ring-green-600 rounded-xl py-6 px-12 right-16 top-8 text-white hover:bg-green-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
          onClick={() => {
            setStep((prev) => {
              kondisiPerStep(prev + 1);
              if (prev == TOTAL_STEP) {
                return TOTAL_STEP - 1;
              }
              return prev + 1;
            });
          }}
          disabled={step == TOTAL_STEP}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Playground;
