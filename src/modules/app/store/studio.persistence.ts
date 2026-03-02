import { del, get, set } from "idb-keyval";

import type { PrintTile } from "@/modules/ready-to-print/types";

import type { EImageStyle, ETileSize } from "../enums";
import { EStudioMode } from "../enums";
import type { BadgeConfig, ImageItem, ImageTransforms } from "../types";
import {
  DEFAULT_BADGE_CONFIG,
  DEFAULT_IMAGE_STYLE,
  DEFAULT_TILE_SIZE,
  DEFAULT_TRANSFORMS,
} from "../types";

const STORAGE_KEYS: Record<EStudioMode, string> = {
  [EStudioMode.PHOTO]: "photo-tiles",
  [EStudioMode.BADGE]: "badge-tiles",
  [EStudioMode.PRINT]: "print-tiles",
};

type PersistedImage = {
  id: string;
  blob: Blob;
  transforms: ImageTransforms;
  tileSize: ETileSize;
  imageStyle: EImageStyle;
  badgeConfig: BadgeConfig;
};

type PersistedPrintTile = {
  id: string;
  printId: string;
  tileSize: ETileSize;
  imageUrl: string;
  title: string;
};

function getStorageKey(mode: EStudioMode): string {
  return STORAGE_KEYS[mode];
}

export async function persistImages(mode: EStudioMode, images: ImageItem[]): Promise<void> {
  const data: PersistedImage[] = images.map((img) => ({
    id: img.id,
    blob: img.file,
    transforms: img.transforms,
    tileSize: img.tileSize,
    imageStyle: img.imageStyle,
    badgeConfig: img.badgeConfig,
  }));
  await set(getStorageKey(mode), data);
}

export async function loadImages(mode: EStudioMode): Promise<ImageItem[]> {
  const data = await get<PersistedImage[]>(getStorageKey(mode));
  if (!data || !Array.isArray(data)) return [];

  return data.map((item) => ({
    id: item.id,
    file:
      item.blob instanceof File
        ? item.blob
        : new File([item.blob], `image-${item.id}`, { type: item.blob.type }),
    previewUrl: URL.createObjectURL(item.blob),
    transforms: item.transforms ?? { ...DEFAULT_TRANSFORMS },
    tileSize: item.tileSize ?? DEFAULT_TILE_SIZE,
    imageStyle: item.imageStyle ?? DEFAULT_IMAGE_STYLE,
    badgeConfig: item.badgeConfig ?? { ...DEFAULT_BADGE_CONFIG },
  }));
}

export async function clearImages(mode: EStudioMode): Promise<void> {
  await del(getStorageKey(mode));
}

export async function persistPrintTiles(printTiles: PrintTile[]): Promise<void> {
  await set(getStorageKey(EStudioMode.PRINT), printTiles);
}

export async function loadPrintTiles(): Promise<PrintTile[]> {
  const data = await get<PersistedPrintTile[]>(getStorageKey(EStudioMode.PRINT));
  if (!data || !Array.isArray(data)) return [];
  return data.map((item) => ({
    id: item.id ?? crypto.randomUUID(),
    printId: item.printId,
    tileSize: item.tileSize ?? DEFAULT_TILE_SIZE,
    imageUrl: item.imageUrl,
    title: item.title,
  }));
}

export async function updatePrintTilesSize(printId: string, tileSize: ETileSize): Promise<void> {
  const data = await get<PersistedPrintTile[]>(getStorageKey(EStudioMode.PRINT));
  if (!data || !Array.isArray(data) || data.length === 0) return;

  const updated = data.map((item) => (item.printId === printId ? { ...item, tileSize } : item));
  await set(getStorageKey(EStudioMode.PRINT), updated);
}
