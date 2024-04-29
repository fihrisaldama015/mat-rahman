"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Playground from "./Playground";
import { useState } from "react";

const Faktorisasi_persamaan_kuadrat_1 = () => {
  const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(true);
  return (
    <DndProvider backend={HTML5Backend}>
      <Playground isSnapToGrid={snapToGridAfterDrop} />
    </DndProvider>
  );
};

export default Faktorisasi_persamaan_kuadrat_1;