import { atom } from "jotai";

import type { PrintTile } from "@/modules/ready-to-print/types";

import { EStudioMode } from "../enums";
import type { ImageItem, ToolMode } from "../types";

export const studioModeAtom = atom<EStudioMode>(EStudioMode.PHOTO);

export const photoTilesAtom = atom<ImageItem[]>([]);
export const badgeTilesAtom = atom<ImageItem[]>([]);

export const selectedImageIdAtom = atom<string | null>(null);

export const activeToolAtom = atom<ToolMode>("move");

export const selectedImageAtom = atom<ImageItem | undefined>((get) => {
  const mode = get(studioModeAtom);
  const images = mode === EStudioMode.PHOTO ? get(photoTilesAtom) : get(badgeTilesAtom);
  const selectedId = get(selectedImageIdAtom);
  if (!selectedId) return undefined;
  return images.find((img) => img.id === selectedId);
});

export const printTilesAtom = atom<PrintTile[]>([]);
export const selectedPrintTileAtom = atom<PrintTile | null>(null);
