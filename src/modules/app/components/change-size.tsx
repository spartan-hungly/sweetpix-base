"use client";

import { useEffect, useState } from "react";
import { cn } from "@tailwind-config/utils/cn";
import { useAtomValue } from "jotai";

import { Popover, PopoverContent, PopoverTrigger, Typography } from "@/shared";

import { EStudioMode, ETileSize } from "../enums";
import { useImageEditor } from "../hooks/use-image-editor";
import { loadPrintTiles, selectedPrintTileAtom, studioModeAtom, updatePrintTilesSize } from "../store";

import { ChangeSizeContent } from "./change-size-content";

export const ChangeSize = () => {
  const [open, setOpen] = useState(false);
  const [printTileSize, setPrintTileSize] = useState<ETileSize | undefined>(undefined);

  const { selectedImage, updateTileSize } = useImageEditor();
  const studioMode = useAtomValue(studioModeAtom);
  const selectedPrintTile = useAtomValue(selectedPrintTileAtom);

  useEffect(() => {
    if (studioMode !== EStudioMode.PRINT || !selectedPrintTile) return;

    loadPrintTiles().then((tiles) => {
      const matched = tiles.find((tile) => tile.printId === selectedPrintTile.printId);
      if (!matched) return;
      setPrintTileSize(matched.tileSize);
    });
  }, [studioMode, selectedPrintTile]);

  const currentValue =
    studioMode === EStudioMode.PRINT
      ? (printTileSize ?? ETileSize.TWELVE_BY_TWELVE)
      : selectedImage?.tileSize;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button type="button" className="cursor-pointer">
            <Typography
              as="span"
              variant="body-sm"
              weight="medium"
              className="text-brand-orange-500 hover:text-brand-orange-600"
            >
              Change Size
            </Typography>
          </button>
        }
      />
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={8}
        popupClassName={cn(
          "bg-white flex flex-col rounded-md shadow-lg gap-xxs border border-secondary sm:w-[440px]"
        )}
      >
        <ChangeSizeContent
          value={currentValue}
          onChange={(value) => {
            if (studioMode === EStudioMode.PRINT && selectedPrintTile) {
              setPrintTileSize(value);
              void updatePrintTilesSize(selectedPrintTile.printId, value);
            } else {
              updateTileSize(value);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
