"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { useAuthRequest } from "@/shared";

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

/**
 * Login form data type
 */
export type LoginFormData = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const { isLoginOpen, onLoginOpenChange, onOpenSignup } = useAuthRequest();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = methods.handleSubmit(async () => {
    toast.success("Login successful");
    onLoginOpenChange(false);
  });

  return {
    methods,
    onSubmit,
    open: isLoginOpen,
    setOpen: onLoginOpenChange,
    isSubmitting: methods.formState.isSubmitting,
    onNavigateToSignup: onOpenSignup,
  };
};
export type UseLoginReturn = ReturnType<typeof useLogin>;
