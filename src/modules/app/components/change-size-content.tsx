"use client";

import { useEffect, useState } from "react";
import { ImageSquare } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { Separator, Typography } from "@/shared";

import { ETileSize } from "../enums";

interface TileSizeOption {
  id: ETileSize;
  label: string;
  subtitle: string;
  priceLabel: string;
  priceSuffix: string;
}

const TILE_SIZE_OPTIONS: TileSizeOption[] = [
  {
    id: ETileSize.EIGHT_BY_EIGHT,
    label: "8 x 8 in.",
    subtitle: "The first 2 are $25",
    priceLabel: "$11",
    priceSuffix: "Each",
  },
  {
    id: ETileSize.TWELVE_BY_TWELVE,
    label: "12 x 12 in.",
    subtitle: "1 tile minimum",
    priceLabel: "$25",
    priceSuffix: "Each",
  },
];

interface ChangeSizeContentProps {
  /**
   * Optional externally controlled value.
   * If not provided, the component manages its own selection state.
   */
  value?: ETileSize;
  /**
   * Called whenever a new size is selected.
   */
  onChange?: (value: ETileSize) => void;
}

export const ChangeSizeContent = ({ value, onChange }: ChangeSizeContentProps) => {
  const [internalValue, setInternalValue] = useState<ETileSize>(ETileSize.EIGHT_BY_EIGHT);

  const selected = value ?? internalValue;

  useEffect(() => {
    // When the component mounts, ensure the initial selection is propagated.
    if (!value) {
      onChange?.(internalValue);
    }
    // We intentionally only run this on mount for the uncontrolled case.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (id: ETileSize) => {
    if (!value) {
      setInternalValue(id);
    }
    onChange?.(id);
  };

  return (
    <div className="flex flex-col">
      <div className="gap-md px-3xl py-2xl flex flex-col">
        <Typography
          variant="heading-sm"
          weight="bold"
          className="font-heading tracking-wide uppercase"
        >
          Select photo tile size
        </Typography>
        <Typography variant="body-sm" className="text-neutral-600">
          Two popular sizes to choose from, since they stick with no damage to walls you can mix and
          match.
        </Typography>
      </div>

      <Separator />

      <div className="gap-md p-2xl flex flex-col">
        {TILE_SIZE_OPTIONS.map((option) => {
          const isSelected = option.id === selected;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={cn(
                "border-secondary px-3xl py-2xl flex items-stretch justify-between rounded-sm border text-left transition-colors",
                "hover:border-black",
                isSelected ? "bg-brand-orange-50 border-transparent" : "bg-white"
              )}
            >
              <div className="gap-xl flex items-center">
                <div
                  className={cn(
                    "flex size-12 items-center justify-center rounded-sm border border-neutral-300 bg-neutral-100",
                    isSelected && "border-black bg-black text-white"
                  )}
                >
                  <ImageSquare size={24} weight="regular" />
                </div>
                <div className="gap-xs flex flex-col">
                  <Typography
                    as="span"
                    variant="body-lg"
                    weight="semibold"
                    className="tabular-nums"
                  >
                    {option.label}
                  </Typography>
                  <Typography as="span" variant="body-sm" className="text-neutral-600">
                    {option.subtitle}
                  </Typography>
                </div>
              </div>

              <div className="gap-xs flex flex-col items-end">
                <Typography
                  as="span"
                  variant="body-lg"
                  weight="bold"
                  className={cn("tabular-nums", isSelected && "text-brand-orange-500")}
                >
                  {option.priceLabel}
                </Typography>
                <Typography as="span" variant="body-xs" className="text-neutral-600 uppercase">
                  {option.priceSuffix}
                </Typography>
              </div>
            </button>
          );
        })}
      </div>

      <Separator />

      <Typography
        as="p"
        variant="body-sm"
        weight="medium"
        className="py-2xl px-3xl text-center text-neutral-800"
      >
        Free shipping in the us 🚚
      </Typography>
    </div>
  );
};

ChangeSizeContent.displayName = "ChangeSizeContent";
