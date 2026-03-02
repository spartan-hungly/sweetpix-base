"use client";

import { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";

import type { EImageStyle, ETileSize } from "../enums";
import { EStudioMode } from "../enums";
import {
  activeToolAtom,
  badgeTilesAtom,
  persistImages,
  photoTilesAtom,
  selectedImageAtom,
  selectedImageIdAtom,
  studioModeAtom,
} from "../store";
import type { BadgeConfig, ImageItem, ToolMode } from "../types";
import {
  DEFAULT_BADGE_CONFIG,
  DEFAULT_IMAGE_STYLE,
  DEFAULT_TILE_SIZE,
  DEFAULT_TRANSFORMS,
  ROTATION_STEP,
  SCALE_MAX,
  SCALE_MIN,
  SCALE_STEP,
} from "../types";

export function useImageEditor() {
  const [photoTiles, setPhotoTiles] = useAtom(photoTilesAtom);
  const [badgeTiles, setBadgeTiles] = useAtom(badgeTilesAtom);
  const [selectedImageId, setSelectedImageId] = useAtom(selectedImageIdAtom);
  const selectedImage = useAtomValue(selectedImageAtom);
  const [activeTool, setActiveTool] = useAtom(activeToolAtom);
  const studioMode = useAtomValue(studioModeAtom);

  const images = studioMode === EStudioMode.PHOTO ? photoTiles : badgeTiles;

  const updateImagesAndPersist = useCallback(
    (updater: (prev: ImageItem[]) => ImageItem[]) => {
      if (studioMode === EStudioMode.PHOTO) {
        setPhotoTiles((prev) => {
          const next = updater(prev);
          persistImages(studioMode, next);
          return next;
        });
      } else if (studioMode === EStudioMode.BADGE) {
        setBadgeTiles((prev) => {
          const next = updater(prev);
          persistImages(studioMode, next);
          return next;
        });
      }
    },
    [setPhotoTiles, setBadgeTiles, studioMode]
  );

  const updateSelectedTransform = useCallback(
    (updater: (item: ImageItem) => ImageItem) => {
      if (!selectedImageId) return;
      updateImagesAndPersist((prev) =>
        prev.map((img) => (img.id === selectedImageId ? updater(img) : img))
      );
    },
    [selectedImageId, updateImagesAndPersist]
  );

  const addImages = useCallback(
    (files: FileList) => {
      const newItems: ImageItem[] = Array.from(files).map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        transforms: { ...DEFAULT_TRANSFORMS },
        tileSize: DEFAULT_TILE_SIZE,
        imageStyle: DEFAULT_IMAGE_STYLE,
        badgeConfig: { ...DEFAULT_BADGE_CONFIG },
      }));

      updateImagesAndPersist((prev) => [...prev, ...newItems]);

      if (!selectedImageId && newItems.length > 0) {
        setSelectedImageId(newItems[0].id);
      }
    },
    [selectedImageId, setSelectedImageId, updateImagesAndPersist]
  );

  const removeImage = useCallback(
    (id: string) => {
      updateImagesAndPersist((prev) => {
        const idx = prev.findIndex((img) => img.id === id);
        const removed = prev.find((img) => img.id === id);
        if (removed) URL.revokeObjectURL(removed.previewUrl);

        const next = prev.filter((img) => img.id !== id);

        if (selectedImageId === id) {
          const nextSelected = next[Math.min(idx, next.length - 1)];
          setSelectedImageId(nextSelected?.id ?? null);
        }

        return next;
      });
    },
    [selectedImageId, setSelectedImageId, updateImagesAndPersist]
  );

  const selectImage = useCallback(
    (id: string) => {
      setSelectedImageId(id);
    },
    [setSelectedImageId]
  );

  const zoomIn = useCallback(() => {
    updateSelectedTransform((img) => ({
      ...img,
      transforms: {
        ...img.transforms,
        scale: Math.min(img.transforms.scale + SCALE_STEP, SCALE_MAX),
      },
    }));
  }, [updateSelectedTransform]);

  const zoomOut = useCallback(() => {
    updateSelectedTransform((img) => ({
      ...img,
      transforms: {
        ...img.transforms,
        scale: Math.max(img.transforms.scale - SCALE_STEP, SCALE_MIN),
      },
    }));
  }, [updateSelectedTransform]);

  const rotate = useCallback(() => {
    updateSelectedTransform((img) => ({
      ...img,
      transforms: {
        ...img.transforms,
        rotation: (img.transforms.rotation + ROTATION_STEP) % 360,
      },
    }));
  }, [updateSelectedTransform]);

  const flip = useCallback(() => {
    updateSelectedTransform((img) => ({
      ...img,
      transforms: { ...img.transforms, flipH: !img.transforms.flipH },
    }));
  }, [updateSelectedTransform]);

  const reset = useCallback(() => {
    updateSelectedTransform((img) => ({
      ...img,
      transforms: { ...DEFAULT_TRANSFORMS },
    }));
  }, [updateSelectedTransform]);

  const updateTileSize = useCallback(
    (size: ETileSize) => {
      if (!selectedImageId) return;
      updateImagesAndPersist((prev) =>
        prev.map((img) => (img.id === selectedImageId ? { ...img, tileSize: size } : img))
      );
    },
    [selectedImageId, updateImagesAndPersist]
  );

  const updateImageStyle = useCallback(
    (style: EImageStyle) => {
      if (!selectedImageId) return;
      updateImagesAndPersist((prev) =>
        prev.map((img) => (img.id === selectedImageId ? { ...img, imageStyle: style } : img))
      );
    },
    [selectedImageId, updateImagesAndPersist]
  );

  const updateBadgeConfig = useCallback(
    (updater: (prev: BadgeConfig) => BadgeConfig) => {
      if (!selectedImageId) return;
      updateImagesAndPersist((prevImages) =>
        prevImages.map((img) =>
          img.id === selectedImageId ? { ...img, badgeConfig: updater(img.badgeConfig) } : img
        )
      );
    },
    [selectedImageId, updateImagesAndPersist]
  );

  const updatePosition = useCallback(
    (x: number, y: number) => {
      updateSelectedTransform((img) => ({
        ...img,
        transforms: { ...img.transforms, x, y },
      }));
    },
    [updateSelectedTransform]
  );

  const toggleMoveTool = useCallback(() => {
    setActiveTool((prev) => (prev === "move" ? null : "move"));
  }, [setActiveTool]);

  return {
    images,
    selectedImage,
    selectedImageId,
    activeTool,
    addImages,
    removeImage,
    selectImage,
    zoomIn,
    zoomOut,
    rotate,
    flip,
    reset,
    updatePosition,
    toggleMoveTool,
    setActiveTool: setActiveTool as (tool: ToolMode) => void,
    updateTileSize,
    updateImageStyle,
    updateBadgeConfig,
  };
}
