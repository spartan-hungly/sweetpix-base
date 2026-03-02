"use client";

import { useRef } from "react";
import { CheckSquare, Square } from "@phosphor-icons/react";

import type { SelectOption, SingleValue } from "@/shared";
import { Select, Separator, Typography } from "@/shared";

import { EImageStyle } from "../enums";
import { useImageEditor } from "../hooks";
import type { BadgeConfig, BadgePosition, TextCase } from "../types";
import {
  BADGE_POSITION_OPTIONS,
  DEFAULT_BADGE_CONFIG,
  FONT_OPTIONS,
  FONT_SIZE_OPTIONS,
} from "../types";

import { ImageThumbnailGrid } from "./image-thumbnail-grid";

const IMAGE_STYLE_OPTIONS: SelectOption[] = [
  { label: "Full color", value: EImageStyle.FULL_COLOR },
  { label: "Black & white", value: EImageStyle.BLACK_AND_WHITE },
];

const fontSelectOptions: SelectOption[] = FONT_OPTIONS.map((f) => ({
  label: f.label,
  value: f.value,
}));

const fontSizeSelectOptions: SelectOption[] = FONT_SIZE_OPTIONS.map((f) => ({
  label: f.label,
  value: f.value,
}));

const positionSelectOptions: SelectOption[] = BADGE_POSITION_OPTIONS.map((p) => ({
  label: p.label,
  value: p.value,
}));

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

interface ColorInputProps {
  value: string;
  onChange: (color: string) => void;
  showBorder?: boolean;
}

const ColorInput = ({ value, onChange, showBorder = false }: ColorInputProps) => {
  const pickerRef = useRef<HTMLInputElement>(null);

  const normalizedValue =
    value.startsWith("#") && value.length === 7 ? value : `#${value.padEnd(6, "0")}`;

  return (
    <div className="gap-md border-primary px-xl flex h-11 flex-1 items-center border">
      <button
        type="button"
        className={`size-[1.5rem] shrink-0 cursor-pointer ${showBorder ? "border border-black/30" : ""}`}
        style={{ backgroundColor: normalizedValue }}
        onClick={() => pickerRef.current?.click()}
      />
      <input
        ref={pickerRef}
        type="color"
        value={normalizedValue}
        onChange={(e) => onChange(e.target.value)}
        className="invisible absolute size-0"
        tabIndex={-1}
      />
      <input
        type="text"
        value={value.replace("#", "").toUpperCase()}
        onChange={(e) => {
          const hex = e.target.value.replace(/[^0-9A-Fa-f]/g, "");
          onChange(`#${hex.slice(0, 6)}`);
        }}
        className="w-full text-sm font-medium outline-none"
      />
    </div>
  );
};

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="flex w-32.5 cursor-pointer items-center gap-1.5"
  >
    {checked ? (
      <CheckSquare size={20} weight="fill" className="text-brand-orange-500 shrink-0" />
    ) : (
      <Square size={20} className="shrink-0 text-neutral-400" />
    )}
    <Typography variant="body-sm" weight="medium">
      {label}
    </Typography>
  </button>
);

export const BadgeSettings = () => {
  const { selectedImage, updateImageStyle, updateBadgeConfig } = useImageEditor();

  const badge: BadgeConfig = selectedImage?.badgeConfig ?? DEFAULT_BADGE_CONFIG;

  const update = <K extends keyof BadgeConfig>(key: K, value: BadgeConfig[K]) => {
    if (!selectedImage) return;
    updateBadgeConfig((prev) => ({ ...prev, [key]: value }));
  };

  const currentStyle = selectedImage?.imageStyle ?? EImageStyle.FULL_COLOR;

  const selectedImageStyle =
    IMAGE_STYLE_OPTIONS.find((opt) => opt.value === currentStyle) ?? IMAGE_STYLE_OPTIONS[0];

  const selectedFont =
    fontSelectOptions.find((opt) => opt.value === badge.font) ?? fontSelectOptions[0];

  const selectedFontSize =
    fontSizeSelectOptions.find((opt) => opt.value === badge.fontSize) ?? fontSizeSelectOptions[2];

  const selectedPosition =
    positionSelectOptions.find((opt) => opt.value === badge.position) ?? positionSelectOptions[1];

  return (
    <>
      <div className="gap-4xl px-4xl pb-4xl flex flex-col">
        {/* Image style */}
        <div className="gap-md flex flex-col">
          <Typography variant="body-sm" weight="medium">
            Image style
          </Typography>
          <Select
            value={selectedImageStyle}
            options={IMAGE_STYLE_OPTIONS}
            onChange={(val) => {
              const option = val as SingleValue<SelectOption>;
              if (option) updateImageStyle(option.value as EImageStyle);
            }}
            isSearchable={false}
            fullWidth
            size="sm"
          />
        </div>

        {/* Text & Color */}
        <div className="gap-md flex flex-col">
          <Typography variant="body-sm" weight="medium">
            Text &amp; Color
          </Typography>
          <Select
            value={selectedFont}
            options={fontSelectOptions}
            onChange={(val) => {
              const option = val as SingleValue<SelectOption>;
              if (option) update("font", option.value as string);
            }}
            isSearchable={false}
            fullWidth
            size="sm"
          />
          <div className="gap-md flex">
            <ColorInput
              value={badge.textColor}
              onChange={(color) => update("textColor", color)}
              showBorder
            />
            <div className="flex-1">
              <Select
                value={selectedFontSize}
                options={fontSizeSelectOptions}
                onChange={(val) => {
                  const option = val as SingleValue<SelectOption>;
                  if (option) update("fontSize", option.value as number);
                }}
                isSearchable={false}
                fullWidth
                size="sm"
              />
            </div>
          </div>
          <div className="gap-lg flex flex-wrap">
            <Checkbox
              checked={badge.textCase === "uppercase"}
              onChange={(checked) =>
                update("textCase", (checked ? "uppercase" : "lowercase") as TextCase)
              }
              label="Uppercase"
            />
            <Checkbox
              checked={badge.textCase === "lowercase"}
              onChange={(checked) =>
                update("textCase", (checked ? "lowercase" : "uppercase") as TextCase)
              }
              label="Lowercase"
            />
            <Checkbox
              checked={badge.addTitle}
              onChange={(checked) => update("addTitle", checked)}
              label="Add title"
            />
          </div>
        </div>

        {/* Badge style & Position */}
        <div className="gap-md flex flex-col">
          <Typography variant="body-sm" weight="medium">
            Badge style &amp; Position
          </Typography>
          <div className="gap-md grid grid-cols-2">
            <ColorInput
              value={badge.badgeColor}
              onChange={(color) => update("badgeColor", color)}
            />
            <Select
              value={selectedPosition}
              options={positionSelectOptions}
              onChange={(val) => {
                const option = val as SingleValue<SelectOption>;
                if (option) update("position", option.value as BadgePosition);
              }}
              isSearchable={false}
              fullWidth
              size="sm"
              className="min-w-fit"
            />
          </div>
          <Checkbox
            checked={badge.extendToEdge}
            onChange={(checked) => update("extendToEdge", checked)}
            label="Extend to Edge"
          />
        </div>
      </div>

      <Separator />
      <ImageThumbnailGrid />
    </>
  );
};
