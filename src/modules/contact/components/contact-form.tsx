"use client";

import { cn } from "@tailwind-config/utils/cn";

import {
  Button,
  FormProvider,
  MODAL_DIMENSIONS,
  RHFInput,
  RHFTextarea,
  SHEET_DIMENSIONS,
  useSmaller,
} from "@/shared";

import type { UseContactReturn } from "../hooks";
import type { ContactFormData } from "../hooks/use-contact";

type ContactFormProps = UseContactReturn;

export const ContactForm = ({ methods, onSubmit, isSubmitting }: ContactFormProps) => {
  const isMobile = useSmaller("sm");

  return (
    <FormProvider formMethods={methods} onSubmit={onSubmit}>
      <div
        className={cn(
          "gap-4xl px-4xl py-3xl flex flex-col overflow-y-auto",
          isMobile ? SHEET_DIMENSIONS.BASE_FORM : MODAL_DIMENSIONS.BASE_FORM
        )}
      >
        <div className="gap-2xl flex flex-col">
          <div className="gap-2xl grid grid-cols-1 sm:grid-cols-2">
            <RHFInput<ContactFormData>
              name="firstName"
              control={methods.control}
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              label="First name"
              required
            />
            <RHFInput<ContactFormData>
              name="lastName"
              control={methods.control}
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              label="Last name"
              required
            />
          </div>
          <RHFInput<ContactFormData>
            name="email"
            control={methods.control}
            type="email"
            placeholder="Your email"
            autoComplete="email"
            label="Email"
            required
          />
          <RHFTextarea<ContactFormData>
            name="message"
            control={methods.control}
            placeholder="Your message"
            label="Comment or Message"
            rows={5}
            required
          />
        </div>
        <Button type="submit" loading={isSubmitting} fullWidth>
          Submit
        </Button>
      </div>
    </FormProvider>
  );
};

ContactForm.displayName = "ContactForm";
