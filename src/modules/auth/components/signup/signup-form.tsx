"use client";

import { cn } from "@tailwind-config/utils/cn";

import {
  Button,
  FormProvider,
  MODAL_DIMENSIONS,
  RHFInput,
  RHFPassword,
  SHEET_DIMENSIONS,
  Typography,
  useSmaller,
} from "@/shared";

import type { UseSignupReturn } from "../../hooks";

type SignupFormProps = UseSignupReturn;

export const SignupForm = ({
  methods,
  onSubmit,
  isSubmitting,
  onNavigateToLogin,
}: SignupFormProps) => {
  const isMobile = useSmaller("sm");
  return (
    <FormProvider formMethods={methods} onSubmit={onSubmit}>
      <div
        className={cn(
          "px-4xl py-3xl gap-4xl flex flex-col overflow-y-auto",
          isMobile ? SHEET_DIMENSIONS.BASE_FORM : MODAL_DIMENSIONS.BASE_FORM
        )}
      >
        <div className="gap-2xl flex flex-col">
          <RHFInput
            name="fullName"
            control={methods.control}
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            label="Full name"
            required
          />
          <RHFInput
            name="email"
            control={methods.control}
            type="email"
            placeholder="Your email"
            autoComplete="email"
            label="Email"
            required
          />
          <RHFInput
            name="company"
            control={methods.control}
            type="text"
            placeholder="Company name"
            autoComplete="organization"
            label="Company"
          />
          <RHFPassword
            name="password"
            control={methods.control}
            placeholder="Your password"
            autoComplete="new-password"
            label="Password"
            required
          />
        </div>
        <div className="gap-xl flex flex-col">
          <Button type="submit" loading={isSubmitting} fullWidth>
            Sign up to Sweet Pix
          </Button>
          <Typography variant="body-sm" color="secondary" weight="regular" className="text-center">
            Already have an account?{" "}
            <button type="button" onClick={onNavigateToLogin} className="cursor-pointer">
              <Typography as="span" variant="body-sm" color="error" weight="medium">
                Log in
              </Typography>
            </button>
          </Typography>
        </div>
      </div>
    </FormProvider>
  );
};
