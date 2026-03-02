"use client";

import { CheckoutForm, OrderSummary } from "@/modules/checkout/components";

import { useCheckout } from "../hooks";

export const CheckoutPage = () => {
  const checkout = useCheckout();

  return (
    <div className="bg-secondary grid min-h-full grid-cols-1 lg:grid-cols-5">
      <div className="bg-white lg:col-span-3">
        <CheckoutForm {...checkout} />
      </div>
      <div className="lg:col-span-2">
        <div className="overflow-y-auto lg:sticky lg:top-0">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
