"use client";

import type { SelectOption, SingleValue } from "@/shared";
import { Select, Typography } from "@/shared";

import { EImageStyle } from "../enums";
import { useImageEditor } from "../hooks";

import { ImageThumbnailGrid } from "./image-thumbnail-grid";

const IMAGE_STYLE_OPTIONS: SelectOption[] = [
  { label: "Full color", value: EImageStyle.FULL_COLOR },
  { label: "Black & white", value: EImageStyle.BLACK_AND_WHITE },
];

export const PhotoSettings = () => {
  const { selectedImage, updateImageStyle } = useImageEditor();

  const currentStyle = selectedImage?.imageStyle ?? EImageStyle.FULL_COLOR;

  const selectedOption =
    IMAGE_STYLE_OPTIONS.find((opt) => opt.value === currentStyle) ?? IMAGE_STYLE_OPTIONS[0];

  return (
    <>
      <div className="flex flex-col gap-md px-4xl pb-4xl">
        <Typography variant="body-sm" weight="medium">
          Image style
        </Typography>
        <Select
          value={selectedOption}
          options={IMAGE_STYLE_OPTIONS}
          onChange={(val) => {
            const option = val as SingleValue<SelectOption>;
            if (option) {
              updateImageStyle(option.value as EImageStyle);
            }
          }}
          isSearchable={false}
          fullWidth
          size="sm"
        />
      </div>

      <ImageThumbnailGrid />
    </>
  );
};
