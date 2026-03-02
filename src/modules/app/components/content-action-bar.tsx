"use client";

import { toast } from "sonner";

import { Button } from "@/shared";

import { useImageEditor } from "../hooks";

export const ContentActionBar = () => {
  const { selectedImage, removeImage } = useImageEditor();

  const handleRemove = () => {
    if (selectedImage) {
      removeImage(selectedImage.id);
    }
  };

  const handleSave = () => {
    toast.success("Changes saved successfully");
  };

  return (
    <div className="gap-sm border-secondary p-lg md:gap-xl md:p-2xl flex h-14 items-center justify-end border-b bg-white lg:h-18">
      <Button
        variant="outlined-secondary"
        size="sm"
        onClick={handleRemove}
        disabled={!selectedImage}
      >
        Remove
      </Button>
      <Button variant="outlined-primary" size="sm">
        Back
      </Button>
      <Button variant="primary" size="sm" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};
