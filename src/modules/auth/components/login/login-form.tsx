"use client";

import { cn } from "@tailwind-config/utils/cn";
import Link from "next/link";

import {
  Button,
  FormProvider,
  MODAL_DIMENSIONS,
  RHFCheckbox,
  RHFInput,
  RHFPassword,
  SHEET_DIMENSIONS,
  Typography,
  useSmaller,
} from "@/shared";

import type { UseLoginReturn } from "../../hooks";

type LoginFormProps = UseLoginReturn;

export const LoginForm = ({
  methods,
  onSubmit,
  isSubmitting,
  onNavigateToSignup,
}: LoginFormProps) => {
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
            name="email"
            control={methods.control}
            type="email"
            placeholder="Your email"
            autoComplete="email"
            label="Email"
            required
          />
          <RHFPassword
            name="password"
            control={methods.control}
            placeholder="Your password"
            autoComplete="current-password"
            label="Password"
            required
          />
          <div className="flex items-center justify-between">
            <RHFCheckbox
              name="rememberMe"
              control={methods.control}
              label="Remember me on this device"
            />
            <Link href="/forgot-password">
              <Typography variant="body-sm" color="error" weight="regular">
                Forgot password?
              </Typography>
            </Link>
          </div>
        </div>
        <div className="gap-xl flex flex-col">
          <Button type="submit" loading={isSubmitting} fullWidth>
            Log in to Sweet Pix
          </Button>
          <Typography variant="body-sm" color="secondary" weight="regular" className="text-center">
            Don't have an account?{" "}
            <button type="button" onClick={onNavigateToSignup} className="cursor-pointer">
              <Typography as="span" variant="body-sm" color="error" weight="medium">
                Join now
              </Typography>
            </button>
          </Typography>
        </div>
      </div>
    </FormProvider>
  );
};
