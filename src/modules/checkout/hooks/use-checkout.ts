"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

/**
 * Checkout form validation schema
 */
export const checkoutSchema = z.object({
  // Contact
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  // Shipping
  company: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State / Province is required"),
  zipCode: z.string().min(1, "ZIP / Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
  // Payment (placeholder – real implementation would use a payment provider)
  cardNumber: z.string().min(1, "Card number is required"),
  expiry: z.string().min(1, "Expiry is required"),
  cvc: z.string().min(1, "CVC is required"),
  cardName: z.string().min(1, "Name on card is required"),
  billingSameAsShipping: z.boolean().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const useCheckout = () => {
  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      address: "",
      company: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      cardName: "",
      billingSameAsShipping: true,
    },
  });

  const onSubmit = methods.handleSubmit(async () => {
    toast.success("Order placed successfully");
  });

  return {
    methods,
    onSubmit,
    isSubmitting: methods.formState.isSubmitting,
  };
};

export type UseCheckoutReturn = ReturnType<typeof useCheckout>;
