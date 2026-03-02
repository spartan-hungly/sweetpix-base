"use client";

import { useCallback } from "react";
import { cn } from "@tailwind-config/utils/cn";

import { useImageEditor } from "../hooks";
import type { BadgeConfig } from "../types";
import { DEFAULT_BADGE_CONFIG } from "../types";

const FONT_MAP: Record<string, string> = {
  "helvetica-neue-bold": "'Helvetica Neue', Helvetica, Arial, sans-serif",
  "arial-bold": "Arial, Helvetica, sans-serif",
  "roboto-bold": "Roboto, sans-serif",
  "inter-bold": "Inter, sans-serif",
};

const PLACEHOLDER = "Enter text";

export const BadgeOverlay = () => {
  const { selectedImage, updateBadgeConfig } = useImageEditor();

  const badge: BadgeConfig = selectedImage?.badgeConfig ?? DEFAULT_BADGE_CONFIG;

  const updateField = useCallback(
    (field: "name" | "title", value: string) => {
      if (!selectedImage) return;
      updateBadgeConfig((prev) => ({ ...prev, [field]: value }));
    },
    [selectedImage, updateBadgeConfig]
  );

  if (!badge.enabled) return null;

  const fontFamily = FONT_MAP[badge.font] ?? FONT_MAP["helvetica-neue-bold"];

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cn(
        "absolute z-10 flex flex-col items-center justify-center gap-1.5 px-11.25 py-3",
        badge.extendToEdge
          ? cn(
              "bottom-[0.75rem] max-w-[50%] min-w-[45%]",
              badge.position === "right" ? "right-0" : "left-0"
            )
          : cn(
              "bottom-9 max-w-[50%] min-w-[45%]",
              badge.position === "right" ? "right-9" : "left-9"
            )
      )}
      style={{ backgroundColor: badge.badgeColor }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="flex w-full items-center justify-center border border-dashed border-white/60">
        <input
          type="text"
          value={badge.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder={PLACEHOLDER}
          className="w-full bg-transparent text-center leading-none font-bold tracking-tight outline-none placeholder:text-white/40"
          style={{
            color: badge.textColor,
            fontFamily,
            fontSize: `${badge.fontSize / 16}rem`,
            textTransform: badge.textCase,
            padding: "0.25rem 0",
          }}
        />
      </div>
      {badge.addTitle && (
        <div className="flex w-full items-center justify-center border border-dashed border-white/60">
          <input
            type="text"
            value={badge.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder={PLACEHOLDER}
            className="w-full bg-transparent text-center leading-none font-medium tracking-tight outline-none placeholder:text-white/40"
            style={{
              color: badge.textColor,
              fontFamily,
              fontSize: `${(Math.round(badge.fontSize * 0.58) / 16).toFixed(4)}rem`,
              textTransform: badge.textCase,
              padding: "0.25rem 0",
            }}
          />
        </div>
      )}
    </div>
  );
};
