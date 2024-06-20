"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Playground from "./Playground";
import { useState } from "react";

const faktorisasi_persamaan_kuadrat_3 = () => {
  const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(true);
  return (
    <DndProvider backend={HTML5Backend}>
      <Playground isSnapToGrid={snapToGridAfterDrop} />
    </DndProvider>
  );
};

export default faktorisasi_persamaan_kuadrat_3;
