"use client";

import { useCallback, useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import type { PrintTile } from "@/modules/ready-to-print/types";

import { EStudioMode, ETileSize } from "../enums";
import {
  badgeTilesAtom,
  loadImages,
  loadPrintTiles,
  photoTilesAtom,
  printTilesAtom,
} from "../store";
import type { ImageItem } from "../types";

const TILE_PRICE_MAP: Record<ETileSize, number> = {
  [ETileSize.EIGHT_BY_EIGHT]: 11,
  [ETileSize.TWELVE_BY_TWELVE]: 25,
};

export function calculateImagesTotalPrice(images: ImageItem[]): number {
  return images.reduce((sum, img) => {
    const price = TILE_PRICE_MAP[img.tileSize] ?? 0;
    return sum + price;
  }, 0);
}

export function calculatePrintTilesTotalPrice(printTiles: PrintTile[]): number {
  return printTiles.reduce((sum, tile) => {
    const price = TILE_PRICE_MAP[tile.tileSize] ?? 0;
    return sum + price;
  }, 0);
}

export function useTilesPricing() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const photoTiles = useAtomValue(photoTilesAtom);
  const badgeTiles = useAtomValue(badgeTilesAtom);
  const tiles = useAtomValue(printTilesAtom);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [photoTiles, badgeTiles, tiles] = await Promise.all([
        loadImages(EStudioMode.PHOTO),
        loadImages(EStudioMode.BADGE),
        loadPrintTiles(),
      ]);

      const imageTiles = [...photoTiles, ...badgeTiles];
      const imageTilesTotal = calculateImagesTotalPrice(imageTiles);
      const printTilesTotal = calculatePrintTilesTotalPrice(tiles);

      setTotalPrice(imageTilesTotal + printTilesTotal);
      setTotalCount(imageTiles.length + tiles.length);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoTiles, badgeTiles, tiles]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    totalPrice,
    totalCount,
    loading,
    refresh,
  };
}
