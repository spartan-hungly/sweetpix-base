"use client";

import { XIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  MODAL_DIMENSIONS,
  Typography,
} from "@/shared";

import { useContact } from "../hooks";

import { ContactForm } from "./contact-form";

export const ContactDialog = () => {
  const contactMethods = useContact();
  const { open, setOpen } = contactMethods;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outlined-primary" size="md">
            Contact
          </Button>
        }
      />
      <DialogContent className={cn(MODAL_DIMENSIONS.CONTACT)}>
        <div className="p-4xl border-secondary gap-xl flex flex-col border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-heading uppercase">Send us a message</DialogTitle>
            <DialogClose
              nativeButton={false}
              render={<XIcon size={20} className="text-quaternary cursor-pointer outline-0" />}
            />
          </div>
          <Typography variant="body-sm" weight="regular" className="text-tertiary">
            Use form below if you have any order questions, comments or inquires
          </Typography>
        </div>
        <ContactForm {...contactMethods} />
      </DialogContent>
    </Dialog>
  );
};
