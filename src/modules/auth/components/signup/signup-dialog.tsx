"use client";

import { XIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  MODAL_DIMENSIONS,
  useSmaller,
} from "@/shared";

import { useSignup } from "../../hooks";

import { SignupForm } from "./signup-form";

export const SignupDialog = () => {
  const signupMethods = useSignup();
  const { open, setOpen } = signupMethods;
  const isMobile = useSmaller("sm");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn(MODAL_DIMENSIONS.SIGNUP, "overflow-hidden p-0")}>
        <div className="flex h-full flex-col-reverse overflow-auto sm:grid sm:grid-cols-[2fr_1.5fr]">
          {/* Illustration panel */}
          <div className="relative h-full">
            {isMobile ? (
              <Image
                src="/images/signup-model-mobile.png"
                alt="Create your Sweet Pix account"
                width={640}
                height={1000}
              />
            ) : (
              <Image
                src="/images/signup-model.svg"
                alt="Create your Sweet Pix account"
                fill
                priority
                className="object-cover"
              />
            )}
          </div>

          {/* Form panel */}
          <div className="flex w-full flex-col bg-white">
            <div className="p-4xl border-secondary flex items-center justify-between border-b">
              <DialogTitle className="uppercase">Create your account </DialogTitle>
              <DialogClose
                nativeButton={false}
                render={<XIcon size={20} className="text-quaternary cursor-pointer outline-0" />}
              />
            </div>
            <SignupForm {...signupMethods} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
