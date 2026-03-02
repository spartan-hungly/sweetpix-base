"use client";

import { useEffect, useState } from "react";
import { cn } from "@tailwind-config/utils/cn";
import { useAtomValue, useSetAtom } from "jotai";

import {
  BadgeSettings,
  ContentActionBar,
  ImageCanvas,
  ImageToolbar,
  PhotoSettings,
  SettingsPanel,
} from "@/modules/app";
import { EStudioMode } from "@/modules/app/enums";
import { useImageEditor } from "@/modules/app/hooks";
import {
  badgeTilesAtom,
  loadImages,
  photoTilesAtom,
  selectedImageIdAtom,
  studioModeAtom,
} from "@/modules/app/store";
import { ReadyToPrintPage } from "@/modules/ready-to-print";

function BadgeToggle() {
  const { selectedImage, updateBadgeConfig } = useImageEditor();
  const enabled = selectedImage?.badgeConfig.enabled ?? false;

  return (
    <button
      type="button"
      onClick={() =>
        selectedImage &&
        updateBadgeConfig((prev) => ({
          ...prev,
          enabled: !prev.enabled,
        }))
      }
      className={cn(
        "relative h-[1.5rem] w-[2.5rem] cursor-pointer rounded-full transition-colors",
        enabled ? "bg-brand-orange-500" : "bg-neutral-300"
      )}
    >
      <div
        className={cn(
          "absolute top-1/2 size-[1.25rem] -translate-y-1/2 rounded-full bg-white shadow-sm transition-[left]",
          enabled ? "left-4.5" : "left-[0.125rem]"
        )}
      />
    </button>
  );
}

export default function StudioPage() {
  const setPhotoTiles = useSetAtom(photoTilesAtom);
  const setBadgeTiles = useSetAtom(badgeTilesAtom);
  const setSelectedImageId = useSetAtom(selectedImageIdAtom);
  const studioMode = useAtomValue(studioModeAtom);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (studioMode === EStudioMode.PRINT) {
      setSelectedImageId(null);
      setHydrated(true);
      return;
    }

    loadImages(studioMode).then((loaded) => {
      if (studioMode === EStudioMode.PHOTO) {
        setPhotoTiles(loaded);
      } else if (studioMode === EStudioMode.BADGE) {
        setBadgeTiles(loaded);
      }
      if (loaded.length > 0) {
        setSelectedImageId(loaded[0].id);
      } else {
        setSelectedImageId(null);
      }
      setHydrated(true);
    });
  }, [studioMode, setPhotoTiles, setBadgeTiles, setSelectedImageId]);

  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center bg-neutral-100">
        <div className="size-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-600" />
      </div>
    );
  }

  if (studioMode === EStudioMode.PRINT) {
    return <ReadyToPrintPage />;
  }

  const isPhoto = studioMode === EStudioMode.PHOTO;

  return (
    <div className="flex h-full flex-col overflow-auto lg:flex-row lg:overflow-hidden">
      <SettingsPanel
        title={isPhoto ? "Photo Settings" : "Name Badge Settings"}
        headerAction={!isPhoto ? <BadgeToggle /> : undefined}
      >
        {isPhoto ? <PhotoSettings /> : <BadgeSettings />}
      </SettingsPanel>
      <div className="flex flex-1 flex-col">
        <ContentActionBar />
        <div className="relative flex flex-1 flex-col items-center overflow-auto bg-neutral-100">
          <div
            className="pointer-events-none absolute inset-0 bg-size-[30.375rem_30.375rem] bg-top-left opacity-20 mix-blend-multiply"
            style={{ backgroundImage: "url('/images/texture.png')" }}
          />
          <div className="gap-xl p-xl md:gap-3xl md:p-3xl relative flex w-full max-w-full flex-col lg:w-169">
            <ImageCanvas />
            <ImageToolbar />
          </div>
        </div>
      </div>
    </div>
  );
}
