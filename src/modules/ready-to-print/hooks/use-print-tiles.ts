"use client";

import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import { DEFAULT_TILE_SIZE } from "@/modules/app";
import {
  loadPrintTiles,
  persistPrintTiles,
  printTilesAtom,
  selectedPrintTileAtom,
} from "@/modules/app/store";

import type { PrintTile, ReadyToPrintItem } from "../types";

export function usePrintTiles(readyToPrintItems: ReadyToPrintItem[]) {
  const [tiles, setTiles] = useAtom(printTilesAtom);
  const [selectedPrintTile, setSelectedPrintTile] = useAtom(selectedPrintTileAtom);

  useEffect(() => {
    loadPrintTiles().then((persisted) => {
      const mapped: PrintTile[] = persisted
        .map((tile) => {
          const item = readyToPrintItems.find((it) => it.id === tile.printId);
          if (!item) return null;
          return {
            id: tile.id,
            printId: tile.printId,
            tileSize: tile.tileSize ?? DEFAULT_TILE_SIZE,
            imageUrl: item.imageUrl,
            title: item.title,
          } satisfies PrintTile;
        })
        .filter((x): x is PrintTile => x !== null);

      setTiles(mapped);

      if (mapped.length > 0) {
        setSelectedPrintTile((prev) => prev ?? mapped[0]);
      } else {
        setSelectedPrintTile(null);
      }
    });
  }, [readyToPrintItems, setSelectedPrintTile, setTiles]);

  const addTile = useCallback(
    (item: ReadyToPrintItem) => {
      const newPrintTile: PrintTile = {
        id: crypto.randomUUID(),
        printId: item.id,
        tileSize: DEFAULT_TILE_SIZE,
        imageUrl: item.imageUrl,
        title: item.title,
      };

      setTiles((prev) => {
        const next: PrintTile[] = [...prev, newPrintTile];
        void persistPrintTiles(next);
        return next;
      });

      setSelectedPrintTile(newPrintTile);
    },
    [setSelectedPrintTile, setTiles]
  );

  return {
    tiles,
    selectedPrintTile,
    addTile,
  };
}
