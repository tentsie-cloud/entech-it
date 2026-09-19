"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { services } from "@/data/services";

type SelectionContextValue = {
  selectedId: string;
  setSelectedId: (id: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({
  children,
  initialId = services[0].id,
}: {
  children: ReactNode;
  initialId?: string;
}) {
  const [selectedId, setSelectedId] = useState(initialId);
  const [selectedArea, setSelectedArea] = useState("");
  const value = useMemo(
    () => ({ selectedId, setSelectedId, selectedArea, setSelectedArea }),
    [selectedId, selectedArea]
  );
  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return ctx;
}
