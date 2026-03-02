"use client";

import { Button, FormProvider, RHFInput, Separator, Typography } from "@/shared";

import type { UseCheckoutReturn } from "../hooks";

type CheckoutFormProps = UseCheckoutReturn;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="gap-4xl flex flex-col">
    <Typography variant="body-lg" weight="semibold">
      {title}
    </Typography>
    {children}
  </div>
);

export const CheckoutForm = ({ methods, onSubmit, isSubmitting }: CheckoutFormProps) => {
  return (
    <FormProvider formMethods={methods} onSubmit={onSubmit}>
      <div className="flex flex-col">
        <div className="p-4xl gap-4xl flex flex-col">
          <Typography variant="heading-sm" weight="bold" className="font-heading uppercase">
            Checkout
          </Typography>
          <Section title="Information">
            <div className="gap-2xl flex flex-col">
              <RHFInput
                name="fullName"
                control={methods.control}
                type="text"
                placeholder="Full name"
                autoComplete="name"
                label="Full name"
                required
              />
              <RHFInput
                name="email"
                control={methods.control}
                type="email"
                placeholder="Email"
                label="Email"
                required
              />
            </div>
          </Section>
        </div>

        <Separator />

        <div className="p-4xl">
          <Section title="Shipping Address">
            <div className="gap-2xl flex flex-col">
              <RHFInput
                name="address"
                control={methods.control}
                type="text"
                placeholder="Address"
                autoComplete="street-address"
                label="Address"
                required
              />
              <RHFInput
                name="company"
                control={methods.control}
                type="text"
                placeholder="Company name (optional)"
                autoComplete="organization"
                label="Company"
              />
              <div className="gap-2xl grid grid-cols-1 sm:grid-cols-3">
                <RHFInput
                  name="city"
                  control={methods.control}
                  type="text"
                  placeholder="City"
                  autoComplete="address-level2"
                  label="City"
                  required
                />
                <RHFInput
                  name="state"
                  control={methods.control}
                  type="text"
                  placeholder="State / Province"
                  autoComplete="address-level1"
                  label="State / Province"
                  required
                />
                <RHFInput
                  name="zipCode"
                  control={methods.control}
                  type="text"
                  placeholder="ZIP / Postal code"
                  autoComplete="postal-code"
                  label="ZIP / Postal code"
                  required
                />
              </div>
              <RHFInput
                name="country"
                control={methods.control}
                type="text"
                placeholder="Country"
                autoComplete="country-name"
                label="Country"
                required
              />
              <RHFInput
                name="phone"
                control={methods.control}
                type="tel"
                placeholder="Phone (optional)"
                autoComplete="tel"
                label="Phone"
              />
            </div>
          </Section>
        </div>

        <Separator />

        <div className="p-4xl">
          <Section title="Payment">
            <RHFInput
              name="cardNumber"
              control={methods.control}
              type="text"
              placeholder="Card number"
              autoComplete="cc-number"
              label="Card number"
              required
            />
            <div className="gap-2xl grid grid-cols-2">
              <RHFInput
                name="expiry"
                control={methods.control}
                type="text"
                placeholder="MM / YY"
                autoComplete="cc-exp"
                label="Expiry"
                required
              />
              <RHFInput
                name="cvc"
                control={methods.control}
                type="text"
                placeholder="CVC"
                autoComplete="cc-csc"
                label="CVC"
                required
              />
            </div>
            <RHFInput
              name="cardName"
              control={methods.control}
              type="text"
              placeholder="Name on card"
              autoComplete="cc-name"
              label="Name on card"
              required
            />
            <Button type="submit" loading={isSubmitting} fullWidth size="lg">
              Place order
            </Button>
          </Section>
        </div>
      </div>
    </FormProvider>
  );
};

CheckoutForm.displayName = "CheckoutForm";
