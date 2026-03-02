export interface CheckoutLineItem {
  id: string;
  title: string;
  variant?: string;
  quantity: number;
  priceCents: number;
  imageUrl?: string;
}

export interface CheckoutSummary {
  items: CheckoutLineItem[];
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
}
