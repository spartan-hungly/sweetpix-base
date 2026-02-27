"use client";

import { useState } from "react";

import { Badge, Button, ConfirmationDialog, Input, Separator, Typography } from "@/shared";

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <div className="gap-4xl p-6xl flex flex-col overflow-auto">
      <Typography variant="display-large" weight="bold" font="heading">
        SweetPic Design System
      </Typography>
      <Typography>
        A masculine, high-contrast design system built for direct-response e-commerce. Engineered to
        eliminate objections and drive conversion through bold, tactical UX patterns.
      </Typography>

      <Separator />

      <Typography variant="heading-lg" weight="bold" font="heading">
        Component Architecture
      </Typography>

      <div className="gap-4xl border-secondary p-4xl flex flex-col rounded-2xl border">
        <Typography variant="heading-md" weight="bold" font="heading">
          Buttons
        </Typography>
        <div className="gap-xl flex flex-col">
          <Typography variant="body-md" weight="regular">
            Primary Button
          </Typography>
          <Button variant="primary" size="md">
            Add To Cart
          </Button>
        </div>
        <div className="gap-xl flex flex-col">
          <Typography variant="body-md" weight="regular">
            Secondary Button
          </Typography>
          <Button variant="secondary" size="md">
            Limited Offer
          </Button>
        </div>
        <div className="gap-xl flex flex-col">
          <Typography variant="body-md" weight="regular">
            Outlined Primary Button
          </Typography>
          <Button variant="outlined-primary" size="md">
            Learn More
          </Button>
        </div>
        <div className="gap-xl flex flex-col">
          <Typography variant="body-md" weight="regular">
            Outlined Secondary Button
          </Typography>
          <Button variant="outlined-secondary" size="md">
            Learn More
          </Button>
        </div>
        <div className="gap-xl flex flex-col">
          <Typography variant="body-md" weight="regular">
            Text Primary Button
          </Typography>
          <Button variant="text-primary" size="md">
            Learn More
          </Button>
        </div>
        <div className="gap-xl flex flex-col">
          <Typography variant="body-md" weight="regular">
            Text Secondary Button
          </Typography>
          <Button variant="text-secondary" size="md">
            Learn More
          </Button>
        </div>
      </div>

      <div className="gap-4xl border-secondary p-4xl flex flex-col rounded-2xl border">
        <Typography variant="heading-md" weight="bold" font="heading">
          Form Inputs
        </Typography>
        <Input label="Email" placeholder="Enter your email" required />
        <Input
          label="Error"
          placeholder="Enter your email"
          required
          error="This is an error message"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          required
          helperText="Strong password"
          helperTextVariant="success"
        />
      </div>

      <div className="gap-4xl border-secondary p-4xl flex flex-col rounded-2xl border">
        <Typography variant="heading-md" weight="bold" font="heading">
          Badges
        </Typography>
        <div className="gap-xl flex flex-wrap items-center">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="teal">Teal</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </div>

      <div className="gap-4xl border-secondary p-4xl flex flex-col rounded-2xl border">
        <Typography variant="heading-md" weight="bold" font="heading">
          Confirmation Dialog
        </Typography>
        <ConfirmationDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
