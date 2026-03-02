"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@bprogress/next/app";
import { ShoppingCart } from "@phosphor-icons/react";
import { useAtomValue } from "jotai";
import Link from "next/link";

import { ContactDialog } from "@/modules/contact";
import { Badge, Button, Separator, Typography, useAuthRequest } from "@/shared";
import { CartPopover } from "@/shared/components/cart/cart-popover";

import { EStudioMode, ETileSize } from "../enums";
import { useImageEditor, useTilesPricing } from "../hooks";
import { loadPrintTiles, studioModeAtom } from "../store";

import { ChangeSize } from "./change-size";

export const AppHeader = () => {
  const { onOpenLogin } = useAuthRequest();
  const { selectedImage } = useImageEditor();
  const { totalPrice, totalCount } = useTilesPricing();
  const studioMode = useAtomValue(studioModeAtom);
  const [printTileSize, setPrintTileSize] = useState<ETileSize | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  useEffect(() => {
    if (studioMode !== EStudioMode.PRINT) {
      setPrintTileSize(null);
      return;
    }

    loadPrintTiles().then((tiles) => {
      if (!tiles.length) return;
      setPrintTileSize(tiles[0].tileSize);
    });
  }, [studioMode]);

  const effectiveSize =
    studioMode === EStudioMode.PRINT
      ? (printTileSize ?? ETileSize.TWELVE_BY_TWELVE)
      : (selectedImage?.tileSize ?? ETileSize.EIGHT_BY_EIGHT);

  const sizeLabel = effectiveSize === ETileSize.TWELVE_BY_TWELVE ? 'Square 12x12"' : 'Square 8x8"';

  return (
    <header className="gap-xl border-secondary px-lg lg:px-2xl flex flex-col border-b bg-white py-3.5 lg:flex-row lg:items-center lg:justify-between">
      <div className="gap-xl lg:gap-3xl flex items-center lg:w-113.5">
        <Link href="/">
          <Typography
            as="span"
            variant="body-xl"
            font="heading"
            weight="bold"
            className="leading-[2.736rem] uppercase"
          >
            sweetpix
          </Typography>
        </Link>

        <Separator orientation="vertical" className="h-[1.28125rem]" />

        <div className="gap-lg lg:gap-xl flex flex-1 flex-wrap items-center justify-end lg:justify-start">
          <Typography variant="body-md" weight="medium">
            Photo Tiles
          </Typography>
          <Typography
            as="span"
            variant="body-sm"
            font="heading"
            className="leading-none text-neutral-600 uppercase"
          >
            {sizeLabel}
          </Typography>
          <ChangeSize />
        </div>
      </div>

      <div className="gap-lg lg:gap-xl flex flex-wrap items-center">
        <Button variant="outlined-primary" size="md" onClick={onOpenLogin}>
          Login
        </Button>
        <ContactDialog />

        <div className="relative">
          <CartPopover
            open={open}
            onOpenChange={setOpen}
            renderTrigger={
              <Button
                type="button"
                variant="outlined-primary"
                size="md"
                startIcon={ShoppingCart}
                onClick={() => setOpen(true)}
              >
                Order Now
              </Button>
            }
          />
          <Badge
            variant="secondary"
            type="number"
            size="small"
            className="absolute -top-2.25 right-0 size-5 min-w-5"
          >
            {totalCount}
          </Badge>
        </div>

        <Button type="button" variant="primary" size="md" onClick={handleCheckout}>
          ${totalPrice} | Order
        </Button>
      </div>
    </header>
  );
};
