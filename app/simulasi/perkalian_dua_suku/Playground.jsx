"use client";
import KotakSoal from "@/app/components/KotakSoal";
import LokasiKotak from "@/app/components/LokasiKotak";
import update from "immutability-helper";
import { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { snapToGrid } from "@/app/components/snapToGrid";
import Latex from "react-latex-next";
import useScreenSize from "@/app/utils/useScreenSize";
import Link from "next/link";
import {
  SimulasiSebelumnya,
  SimulasiSelanjutnya,
} from "@/app/components/NavigasiSoal";
import {
  ButtonNextStep,
  ButtonPrevStep,
} from "@/app/components/ButtonSimulasi";

const styles = {
  width: "100%",
  height: "100%",
  border: "1px solid gray",
  position: "relative",
};

const NORMAL_BOX_WIDTH = 64;
const BIG_BOX_WIDTH = 2 * NORMAL_BOX_WIDTH;
const BOX_TOP = 256;
const GAP = 32;
const TOTAL_STEP = 22;

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
    a: { title: "X ", left: 0, top: 0 },
    b: { title: "-1", left: 128 + 16, top: 0 },
    c: { title: "1", left: 128 + 64 + 32, top: 0 },
    // d: { title: "X ", left: 128 + 16, top: 0 },
  };

  const screenSize = useScreenSize();
  let BOX_LEFT = Math.round(screenSize.width / 2 / 32) * 32 - BIG_BOX_WIDTH;
  const kondisiPerStep = (step) => {
    const INITIAL_LEFT = BOX_LEFT - BIG_BOX_WIDTH;
    if (step == 1) {
      setKotak({});
    }
    if (step == 4) {
      addBox("1", "X ", BOX_LEFT, BOX_TOP - NORMAL_BOX_WIDTH - GAP);
    } else if (step == 5) {
      addBox(
        "2",
        "-1",
        BOX_LEFT + BIG_BOX_WIDTH,
        BOX_TOP - NORMAL_BOX_WIDTH - GAP
      );
    } else if (step == 6) {
      addBox(
        "3",
        "-1",
        BOX_LEFT + BIG_BOX_WIDTH + NORMAL_BOX_WIDTH,
        BOX_TOP - NORMAL_BOX_WIDTH - GAP
      );
    } else if (step == 8) {
      addBox("4", "1", BOX_LEFT - NORMAL_BOX_WIDTH - GAP, BOX_TOP);
    } else if (step == 9) {
      addBox(
        "5",
        "1",
        BOX_LEFT - NORMAL_BOX_WIDTH - GAP,
        BOX_TOP + NORMAL_BOX_WIDTH
      );
    } else if (step == 10) {
      addBox(
        "6",
        "1",
        BOX_LEFT - NORMAL_BOX_WIDTH - GAP,
        BOX_TOP + NORMAL_BOX_WIDTH * 2
      );
    } else if (step == 12) {
      addBox("7", "X ", BOX_LEFT, BOX_TOP);
    } else if (step == 13) {
      addBox("10", "X ", BOX_LEFT, BOX_TOP + NORMAL_BOX_WIDTH);
    } else if (step == 14) {
      addBox("13", "X ", BOX_LEFT, BOX_TOP + NORMAL_BOX_WIDTH * 2);
    } else if (step == 16) {
      addBox("8", "-1", BOX_LEFT + BIG_BOX_WIDTH, BOX_TOP);
    } else if (step == 17) {
      addBox("9", "-1", BOX_LEFT + BIG_BOX_WIDTH + NORMAL_BOX_WIDTH, BOX_TOP);
    } else if (step == 18) {
      addBox("11", "-1", BOX_LEFT + BIG_BOX_WIDTH, BOX_TOP + NORMAL_BOX_WIDTH);
    } else if (step == 19) {
      addBox(
        "12",
        "-1",
        BOX_LEFT + BIG_BOX_WIDTH + NORMAL_BOX_WIDTH,
        BOX_TOP + NORMAL_BOX_WIDTH
      );
    } else if (step == 20) {
      addBox(
        "14",
        "-1",
        BOX_LEFT + BIG_BOX_WIDTH,
        BOX_TOP + NORMAL_BOX_WIDTH * 2
      );
    } else if (step == 21) {
      addBox(
        "15",
        "-1",
        BOX_LEFT + BIG_BOX_WIDTH + NORMAL_BOX_WIDTH,
        BOX_TOP + NORMAL_BOX_WIDTH * 2
      );
    }
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
            <Latex>$(x-2) . 3$</Latex>
          </h1>
        </div>

        <div ref={dropRef} style={styles} className="transition-all">
          <SimulasiSelanjutnya babSekarang={2} />
          <SimulasiSebelumnya babSekarang={2} />
          <div
            className="absolute"
            style={{
              left: BOX_LEFT,
              top: BOX_TOP,
            }}
          >
            <div className="relative">
              <div
                className="animate-popup"
                style={{ display: step > 1 ? "block" : "none" }}
              >
                <div className="absolute -translate-y-24 -translate-x-4 w-0.5 h-[22rem] bg-black"></div>
                <div className="absolute -translate-y-4 -translate-x-24 w-[28rem] h-0.5 bg-black"></div>
              </div>
            </div>
          </div>
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
            style={{ display: step >= 3 ? "flex" : "none" }}
          >
            <div className="flex flex-row items-start gap-4 p-6 bg-slate-100 rounded-xl shadow-xl ring-1 ring-slate-300">
              <div className="flex flex-col items-start gap-4">
                <div
                  className=" flex-col items-center gap-2"
                  style={{
                    display: "flex",
                  }}
                >
                  <h1 className="text-2xl font-medium">Hasil</h1>

                  {step >= 7 ? (
                    <div
                      key={1}
                      className="bg-white rounded-lg px-3 py-1 ring-1 text-lg animate-popup"
                    >
                      <Latex>$(x-2).3$</Latex>
                    </div>
                  ) : (
                    <div
                      key={2}
                      className="bg-white rounded-lg px-3 py-1 ring-1 text-lg animate-popup"
                    >
                      <Latex>$(x-2)$</Latex>
                    </div>
                  )}

                  {step >= 15 ? (
                    <>
                      <Latex>$ \downarrow $</Latex>
                      <div
                        key={1}
                        className="bg-white rounded-lg px-3 py-1 ring-1 text-lg animate-popup"
                      >
                        <Latex>$3x-6$</Latex>
                      </div>
                    </>
                  ) : (
                    step >= 11 && (
                      <>
                        <Latex>$ \downarrow $</Latex>
                        <div
                          key={2}
                          className="bg-white rounded-lg px-3 py-1 ring-1 text-lg animate-popup"
                        >
                          <Latex>$3x$</Latex>
                        </div>
                      </>
                    )
                  )}
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
        <ButtonPrevStep
          onClick={() => {
            setStep((prev) => {
              kondisiPerStep(prev - 1);
              return prev - 1;
            });
          }}
          disabled={step == 0}
        />
        <ButtonNextStep
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
        />
      </div>
    </div>
  );
};

export default Playground;
