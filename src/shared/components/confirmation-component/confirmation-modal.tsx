"use client";

import { TrashIcon, XIcon } from "@phosphor-icons/react";

import type { ConfirmationDialogProps } from "@/shared";
import {
  Button,
  ConfirmationContent,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared";

export const ConfirmationModal = (props: ConfirmationDialogProps) => {
  const { open, setOpen, title, renderTrigger, isShowTrigger = true } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isShowTrigger ? (
        <DialogTrigger
          render={
            renderTrigger ?? (
              <Button
                variant="outlined-secondary"
                iconOnly
                startIcon={TrashIcon}
                className="p-sm!"
              />
            )
          }
        />
      ) : null}
      <DialogContent>
        <div className="py-xl px-4xl flex items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose
            nativeButton={false}
            render={<XIcon size={20} className="text-quaternary cursor-pointer outline-0" />}
          />
        </div>
        <DialogDescription className="sr-only">{title}</DialogDescription>
        <ConfirmationContent {...props} />
      </DialogContent>
    </Dialog>
  );
};
