"use client";

import { useEffect, useState } from "react";
import { ImageSquare } from "@phosphor-icons/react";

import { EStudioMode, ETileSize } from "@/modules/app/enums";
import { loadImages, loadPrintTiles } from "@/modules/app/store";
import { Button, Input, Typography } from "@/shared";

import type { CheckoutSummary } from "../types";

const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

const TILE_PRICE_MAP: Record<ETileSize, number> = {
  [ETileSize.EIGHT_BY_EIGHT]: 11,
  [ETileSize.TWELVE_BY_TWELVE]: 25,
};

const TILE_VARIANT_LABEL: Record<ETileSize, string> = {
  [ETileSize.EIGHT_BY_EIGHT]: 'Square 8x8"',
  [ETileSize.TWELVE_BY_TWELVE]: 'Square 12x12"',
};

interface OrderSummaryProps {
  summary?: CheckoutSummary;
  onApplyPromocode?: (code: string) => void;
}

export const OrderSummary = ({ summary, onApplyPromocode }: OrderSummaryProps) => {
  const [currentSummary, setCurrentSummary] = useState<CheckoutSummary | null>(summary ?? null);
  const [promocode, setPromocode] = useState("");

  useEffect(() => {
    if (summary) {
      setCurrentSummary(summary);
      return;
    }

    const loadSummary = async () => {
      const [photoTiles, badgeTiles, tiles] = await Promise.all([
        loadImages(EStudioMode.PHOTO),
        loadImages(EStudioMode.BADGE),
        loadPrintTiles(),
      ]);

      const items: CheckoutSummary["items"] = [
        ...photoTiles.map((tile) => ({
          id: tile.id,
          title: "Photo Tile",
          variant: TILE_VARIANT_LABEL[tile.tileSize],
          quantity: 1,
          priceCents: (TILE_PRICE_MAP[tile.tileSize] ?? 0) * 100,
          imageUrl: tile.previewUrl,
        })),
        ...badgeTiles.map((tile) => ({
          id: tile.id,
          title: "Name Badge Tile",
          variant: TILE_VARIANT_LABEL[tile.tileSize],
          quantity: 1,
          priceCents: (TILE_PRICE_MAP[tile.tileSize] ?? 0) * 100,
          imageUrl: tile.previewUrl,
        })),
        ...tiles.map((tile) => ({
          id: tile.id,
          title: tile.title || "Print Tile",
          variant: TILE_VARIANT_LABEL[tile.tileSize],
          quantity: 1,
          priceCents: (TILE_PRICE_MAP[tile.tileSize] ?? 0) * 100,
          imageUrl: tile.imageUrl,
        })),
      ];

      const subtotalCents = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
      const shippingCents = 500;
      const taxCents = 0;
      const totalCents = subtotalCents + shippingCents + taxCents;

      setCurrentSummary({
        items,
        subtotalCents,
        shippingCents,
        taxCents,
        totalCents,
      });
    };

    void loadSummary();
  }, [summary]);

  const effectiveSummary: CheckoutSummary = currentSummary ?? {
    items: [],
    subtotalCents: 0,
    shippingCents: 500,
    taxCents: 0,
    totalCents: 500,
  };

  const { items, subtotalCents, shippingCents, taxCents, totalCents } = effectiveSummary;

  const handleApplyPromo = () => {
    const trimmed = promocode.trim();
    if (trimmed) onApplyPromocode?.(trimmed);
  };

  return (
    <div className="p-4xl gap-4xl flex flex-col">
      {/* Header */}
      <Typography variant="heading-sm" weight="bold" className="tracking-wide uppercase">
        Your order ({items.length})
      </Typography>

      {/* Line items */}
      <div className="gap-4xl flex flex-col">
        {items.map((item) => (
          <div key={item.id} className="gap-xl flex">
            <div className="border-secondary flex size-20 shrink-0 overflow-hidden rounded-lg border bg-neutral-200">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <ImageSquare size={28} className="text-neutral-500" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="gap-md flex items-start justify-between">
                <Typography variant="body-md" weight="semibold">
                  {item.title} ({item.quantity})
                </Typography>
                <Typography variant="body-md" weight="medium" className="shrink-0 tabular-nums">
                  {formatPrice(item.quantity * item.priceCents)}
                </Typography>
              </div>
              <div className="mt-md gap-xs flex flex-col">
                <div className="flex justify-between">
                  <Typography variant="body-sm" className="text-neutral-600">
                    Size
                  </Typography>
                  <Typography variant="body-sm">{item.variant ?? "—"}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body-sm" className="text-neutral-600">
                    Per Tile
                  </Typography>
                  <Typography variant="body-sm" className="tabular-nums">
                    {formatPrice(item.priceCents)}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body-sm" className="text-neutral-600">
                    Quantity
                  </Typography>
                  <Typography variant="body-sm">x{item.quantity}</Typography>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promocode */}
      <div className="mt-4xl flex gap-0">
        <Input
          placeholder="Promocode"
          value={promocode}
          onChange={(e) => setPromocode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
          fullWidth
          containerClassName="flex-1 rounded-r-none border-r-0"
          aria-label="Promocode"
        />
        <Button
          type="button"
          variant="primary"
          onClick={handleApplyPromo}
          className="px-3xl py-md rounded-l-none uppercase"
        >
          Apply
        </Button>
      </div>

      {/* Totals */}
      <div className="mt-4xl gap-md flex flex-col">
        <div className="flex justify-between">
          <Typography variant="body-md">Subtotal</Typography>
          <Typography variant="body-md" className="tabular-nums">
            {formatPrice(subtotalCents)}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography variant="body-md">Shipping</Typography>
          <Typography variant="body-md" className="tabular-nums">
            {formatPrice(shippingCents)}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography variant="body-md">Tax</Typography>
          <Typography variant="body-md" className="tabular-nums">
            {formatPrice(taxCents)}
          </Typography>
        </div>
        <div className="mt-2xl pt-2xl flex justify-between border-t border-neutral-300">
          <Typography variant="body-lg" weight="bold" className="tracking-wide uppercase">
            Total
          </Typography>
          <Typography variant="body-lg" weight="bold" className="tabular-nums">
            {formatPrice(totalCents)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

OrderSummary.displayName = "OrderSummary";
