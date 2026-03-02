"use client";

import { useRef } from "react";
import { CheckCircle } from "@phosphor-icons/react";

import { Separator, Typography } from "@/shared";

import { useImageEditor } from "../hooks";

export const ImageThumbnailGrid = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { images, selectedImageId, addImages, selectImage } = useImageEditor();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addImages(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <div className="gap-xl flex flex-col">
      <Separator />

      <div className="px-4xl py-md flex items-center justify-between">
        <Typography
          as="span"
          variant="body-sm"
          font="heading"
          className="text-neutral-600 uppercase"
        >
          Image count: {images.length}
        </Typography>
        <button className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <Typography as="span" variant="body-sm" weight="medium" className="text-brand-orange-500">
            + Add more
          </Typography>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {images.length > 0 && (
        <div className="px-xl md:px-4xl flex flex-wrap gap-2.5 md:gap-3.5">
          {images.map((image) => {
            const isSelected = image.id === selectedImageId;
            return (
              <button
                key={image.id}
                onClick={() => selectImage(image.id)}
                className="relative aspect-square max-w-39.25 min-w-[5rem] flex-1 cursor-pointer overflow-hidden md:min-w-30"
              >
                <img
                  src={image.previewUrl}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
                {isSelected && (
                  <>
                    <div className="absolute inset-0 bg-black/50" />
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-brand-orange-500 absolute top-2.25 right-2.25"
                    />
                  </>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
