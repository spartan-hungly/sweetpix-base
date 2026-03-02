"use client";

import { useEffect, useState } from "react";
import { XIcon } from "@phosphor-icons/react";

import { EStudioMode, ETileSize } from "@/modules/app/enums";
import { loadImages, loadPrintTiles } from "@/modules/app/store";
import { Button, Separator, Typography } from "@/shared";

import { CartItem } from "./cart-item";

type CartItemType = {
  id: string;
  title: string;
  variant?: string;
  quantity: number;
  priceCents: number;
  imageUrl?: string;
};

type CartProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items?: CartItemType[];
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
};

const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);

const TILE_PRICE_MAP: Record<ETileSize, number> = {
  [ETileSize.EIGHT_BY_EIGHT]: 11,
  [ETileSize.TWELVE_BY_TWELVE]: 25,
};

const TILE_VARIANT_LABEL: Record<ETileSize, string> = {
  [ETileSize.EIGHT_BY_EIGHT]: 'Square 8x8"',
  [ETileSize.TWELVE_BY_TWELVE]: 'Square 12x12"',
};

export const Cart = ({ onOpenChange, items, onRemoveItem, onCheckout }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(items ?? []);

  useEffect(() => {
    if (items && items.length) {
      setCartItems(items);
      return;
    }

    const loadCartItems = async () => {
      const [photoTiles, badgeTiles, tiles] = await Promise.all([
        loadImages(EStudioMode.PHOTO),
        loadImages(EStudioMode.BADGE),
        loadPrintTiles(),
      ]);

      const photoItems: CartItemType[] = photoTiles.map((tile) => ({
        id: tile.id,
        title: "Photo Tile",
        variant: TILE_VARIANT_LABEL[tile.tileSize],
        quantity: 1,
        priceCents: (TILE_PRICE_MAP[tile.tileSize] ?? 0) * 100,
        imageUrl: tile.previewUrl,
      }));

      const badgeItems: CartItemType[] = badgeTiles.map((tile) => ({
        id: tile.id,
        title: "Name Badge Tile",
        variant: TILE_VARIANT_LABEL[tile.tileSize],
        quantity: 1,
        priceCents: (TILE_PRICE_MAP[tile.tileSize] ?? 0) * 100,
        imageUrl: tile.previewUrl,
      }));

      const printItems: CartItemType[] = tiles.map((tile) => ({
        id: tile.id,
        title: tile.title || "Print Tile",
        variant: TILE_VARIANT_LABEL[tile.tileSize],
        quantity: 1,
        priceCents: (TILE_PRICE_MAP[tile.tileSize] ?? 0) * 100,
        imageUrl: tile.imageUrl,
      }));

      setCartItems([...photoItems, ...badgeItems, ...printItems]);
    };

    void loadCartItems();
  }, [items]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <div className="flex flex-col">
      <div className="px-3xl py-2xl flex items-center justify-between">
        <Typography variant="body-xl" weight="bold" className="font-heading uppercase">
          Shoping Cart
        </Typography>
        <Button
          type="button"
          startIcon={XIcon}
          variant="text-primary"
          iconOnly
          onClick={handleClose}
        />
      </div>

      <Separator />

      <div className="px-3xl py-2xl gap-3xl flex max-h-[280px] flex-col overflow-y-auto">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} onRemoveItem={onRemoveItem} />
        ))}

        {cartItems.length === 0 && (
          <Typography variant="body-sm" className="text-center text-neutral-500">
            Your cart is empty.
          </Typography>
        )}
      </div>

      <Separator />

      <div className="px-3xl py-2xl gap-2xl flex flex-col">
        <div className="gap-sm flex flex-col">
          <CartPrice label="Subtotal" price={subtotal} />
          <CartPrice label="Shipping" price={500} />
          <Separator />
          <CartPrice label="Total" price={subtotal + 500} />
        </div>
        <Button type="button" variant="primary" size="md" fullWidth onClick={onCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

type CartPriceProps = {
  label: string;
  price: number;
};
const CartPrice = ({ label, price }: CartPriceProps) => {
  return (
    <div className="flex items-center justify-between">
      <Typography variant="body-md" weight="medium">
        {label}
      </Typography>
      <Typography variant="body-md" weight="medium" className="tabular-nums">
        {formatPrice(price)}
      </Typography>
    </div>
  );
};
