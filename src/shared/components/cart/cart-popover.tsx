"use client";

import { useRouter } from "@bprogress/next/app";
import { cn } from "@tailwind-config/utils/cn";

import { Popover, PopoverContent, PopoverTrigger } from "../popover";

import { Cart } from "./cart";

type CartPopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  renderTrigger: React.ReactElement;
};

export const CartPopover = ({ open, onOpenChange, renderTrigger }: CartPopoverProps) => {
  const router = useRouter();
  const handleCheckout = () => {
    router.push("/checkout");
  };
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger render={renderTrigger} />
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={8}
        popupClassName={cn(
          "bg-white flex flex-col rounded-md shadow-lg gap-xxs border border-secondary sm:w-[440px]"
        )}
      >
        <Cart open={open} onOpenChange={onOpenChange} onCheckout={handleCheckout} />
      </PopoverContent>
    </Popover>
  );
};
