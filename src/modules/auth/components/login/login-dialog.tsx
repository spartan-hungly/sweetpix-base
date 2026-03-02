"use client";

import { XIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { Dialog, DialogClose, DialogContent, DialogTitle, MODAL_DIMENSIONS } from "@/shared";

import { useLogin } from "../../hooks";
import { LoginForm } from "..";

export const LoginDialog = () => {
  const loginMethods = useLogin();
  const { open, setOpen } = loginMethods;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn(MODAL_DIMENSIONS.LOGIN)}>
        <div className="p-4xl border-secondary flex items-center justify-between border-b">
          <DialogTitle className="uppercase">
            Welcome back to <br />
            sweet pix login below
          </DialogTitle>
          <DialogClose
            nativeButton={false}
            render={<XIcon size={20} className="text-quaternary cursor-pointer outline-0" />}
          />
        </div>
        <LoginForm {...loginMethods} />
      </DialogContent>
    </Dialog>
  );
};
