"use client";

import { createElement } from "react";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { Typography } from "..";

const ICON_SIZE = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 30,
  xl: 36,
};

const TEXT_SIZE = {
  xs: "body-sm" as const,
  sm: "body-md" as const,
  md: "body-lg" as const,
  lg: "heading-sm" as const,
  xl: "heading-md" as const,
};

type LoadingProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

export const Loading = ({
  size = "md",
  text,
  className,
  iconClassName,
  textClassName,
}: LoadingProps) => {
  const renderIcon = createElement(CircleNotchIcon, {
    size: ICON_SIZE[size],
    className: cn("animate-spin text-brand-primary", iconClassName),
    "aria-hidden": "true", // Icons are decorative when there's text
  });
  return (
    <div className={cn("flex h-full flex-col items-center justify-center gap-2", className)}>
      {renderIcon}
      {text && (
        <Typography
          variant={TEXT_SIZE[size]}
          className={cn("text-brand-primary animate-bounce", textClassName)}
        >
          {text}
        </Typography>
      )}
    </div>
  );
};
