"use client";
import KotakSoal from "@/app/components/KotakSoal";
import LokasiKotak from "@/app/components/LokasiKotak";
import update from "immutability-helper";
import { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { snapToGrid } from "@/app/components/snapToGrid";
import Latex from "react-latex-next";

const styles = {
  width: "100%",
  height: "100%",
  border: "1px solid gray",
  position: "relative",
};

const randomId = () => Math.random().toString(36).substring(7);

const Playground = ({ isSnapToGrid }) => {
  const [step, setStep] = useState(0);
  const [isPrev, setIsPrev] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewPL, setPreviewPL] = useState(false);
  const [kotak, setKotak] = useState({});
  const listKotak = {
    a: { title: "X^2", left: 0, top: 0 },
    b: { title: "X", left: 128 + 16, top: 0 },
    c: { title: "1", left: 128 + 64 + 32, top: 0 },
    // d: { title: "X ", left: 128 + 16, top: 0 },
  };

  const kondisiPerStep = (step) => {
    if (step == 1) {
      setKotak({});
    }
    if (step == 2) {
      addBox("1", "X^2", 128 * 4, 200);
      setPreview(false);
    } else if (step == 3) {
      setPreview(false);

      addBox("2", "X", 128 * 5 + 64, 200);
    } else if (step == 4) {
      setPreview(false);

      addBox("3", "X", 800, 200);
    } else if (step == 5) {
      setPreview(false);

      addBox("4", "1", 900, 200);
    } else if (step == 6) {
      setPreview(false);

      setKotak((prev) => ({
        ...kotak,
        [1]: { ...prev[1], left: 672, top: 192 },
        [2]: { title: "X ", left: 672, top: 320 },
        [3]: { ...prev[3], left: 800, top: 192 },
        [4]: { ...prev[4], left: 800, top: 320 },
      }));
    } else if (step == 7) {
      setPreview(true);
    } else if (step == 8) {
      setPreviewPL(true);
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
          className="absolute flex flex-col gap-3 items-center left-1/2 text-black bg-white  -translate-x-1/2 -translate-y-1/2 transition-all"
          style={{ top: step > 0 ? "8rem" : "50%" }}
        >
          <div className="px-3 py-2 rounded-xl shadow-xl ring-1">Soal</div>
          <h1 className="text-3xl">
            <Latex>$X^2 + 2X + 1$</Latex>
          </h1>
        </div>

        <div ref={dropRef} style={styles} className="transition-all">
          <div
            className="absolute left-[672px] top-[192px] animate-popup text-black"
            style={{ display: preview ? "block" : "none" }}
          >
            <div className="relative">
              <div className="absolute -translate-y-8 w-[128px]">
                <div className="w-full flex flex-col items-center justify-center">
                  <Latex>$X$</Latex>
                  <div className="bg-black translate-y-0 w-3/4 h-[1px]"></div>
                </div>
              </div>
              <div className="absolute w-[64px] translate-x-[128px] -translate-y-8">
                <div className="w-full flex flex-col items-center justify-center">
                  <Latex>$1$</Latex>
                  <div className="bg-black translate-y-0 w-3/4 h-[1px]"></div>
                </div>
              </div>
              <div className="absolute translate-y-[128px] -translate-x-8 h-[64px] flex items-center">
                <div className="-rotate-90">
                  <Latex>$1$</Latex>
                </div>
                <div className="bg-black translate-x-4 h-3/4 w-[1px]"></div>
              </div>
              <div className="absolute -translate-x-8 h-32 flex items-center">
                <div className="-rotate-90">
                  <Latex>$X$</Latex>
                </div>
                <div className="bg-black translate-x-1 h-3/4 w-[1px]"></div>
              </div>
            </div>
          </div>
          {Object.keys(kotak).map((key) => (
            <KotakSoal key={key} id={key} {...kotak[key]} />
          ))}
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
            setIsPrev(true);
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
              if (prev == 8) {
                return 8;
              }
              return prev + 1;
            });
          }}
          disabled={step == 8}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Playground;
