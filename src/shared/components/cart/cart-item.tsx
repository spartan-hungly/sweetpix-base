import { ImageSquare, PlusIcon, TrashIcon } from "@phosphor-icons/react";

import { Button } from "../button";
import { Typography } from "../typography";

export type TCartItem = {
  id: string;
  title: string;
  variant?: string;
  quantity: number;
  priceCents: number;
  imageUrl?: string;
};

const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);

type CartItemProps = {
  item: TCartItem;
  onRemoveItem?: (id: string) => void;
};

export const CartItem = ({ item, onRemoveItem }: CartItemProps) => {
  return (
    <div className="gap-xl flex">
      <div className="border-secondary flex size-16 shrink-0 overflow-hidden rounded-md border bg-neutral-200">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center">
            <ImageSquare size={22} className="text-neutral-500" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="gap-xl flex items-center">
          <div className="flex flex-1 flex-col">
            <Typography variant="body-md" weight="semibold" className="truncate">
              {item.title}
            </Typography>
            <div className="gap-xs text-tertiary flex items-center">
              <Typography variant="body-xs" className="text-tertiary">
                {item.variant ?? "—"}
              </Typography>
              |
              <Button
                size="xs"
                variant="text-secondary"
                startIcon={<PlusIcon size={12} />}
                className="text-xs no-underline"
              >
                Add more
              </Button>
            </div>
          </div>
          <Typography variant="body-sm" weight="medium" className="shrink-0">
            {formatPrice(item.priceCents * item.quantity)}
          </Typography>
          <Button
            type="button"
            onClick={() => onRemoveItem?.(item.id)}
            variant="text-primary"
            iconOnly
            startIcon={TrashIcon}
          />
        </div>
      </div>
    </div>
  );
};
