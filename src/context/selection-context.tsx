"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { services } from "@/data/services";

type SelectionContextValue = {
  selectedId: string;
  setSelectedId: (id: string) => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState(services[0].id);
  const value = useMemo(() => ({ selectedId, setSelectedId }), [selectedId]);
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
