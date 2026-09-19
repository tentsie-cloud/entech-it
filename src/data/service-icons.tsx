import { Cpu, HardDrive, Laptop, Thermometer, type LucideIcon } from "lucide-react";

/** Icon shown in place of a photo for services without one yet. */
export const fallbackIcon: Record<string, LucideIcon> = {
  macbook: Laptop,
  laptop: Cpu,
  "data-recovery": HardDrive,
  "ps5-overheating": Thermometer,
};
