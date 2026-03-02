"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { UploadSimple } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";
import { useAtomValue } from "jotai";

import { Button, Typography } from "@/shared";

import { EImageStyle } from "../enums";
import { useImageEditor } from "../hooks";
import { studioModeAtom } from "../store";
import type { BadgeConfig } from "../types";
import { DEFAULT_BADGE_CONFIG } from "../types";

import { BadgeOverlay } from "./badge-overlay";

export const ImageCanvas = () => {
  const { selectedImage, activeTool, updatePosition, addImages } = useImageEditor();
  const studioMode = useAtomValue(studioModeAtom);
  const badgeConfig: BadgeConfig = selectedImage?.badgeConfig ?? DEFAULT_BADGE_CONFIG;
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const prevContainerSize = useRef<number | null>(null);
  const transformsRef = useRef(selectedImage?.transforms ?? null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDraggingState, setIsDraggingState] = useState(false);
  const [imgAspect, setImgAspect] = useState<number | null>(null);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    transformsRef.current = selectedImage?.transforms ?? null;
  }, [selectedImage?.transforms]);

  useEffect(() => {
    setImgAspect(null);
  }, [selectedImage?.id]);

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setImgAspect(naturalWidth / naturalHeight);
  }, []);

  const clampPosition = useCallback(
    (x: number, y: number): { x: number; y: number } => {
      if (!containerRef.current || imgAspect === null || !selectedImage) {
        return { x, y };
      }

      const containerSize = containerRef.current.offsetWidth;
      const { scale, rotation } = selectedImage.transforms;

      let imgW: number;
      let imgH: number;

      if (imgAspect >= 1) {
        imgH = containerSize;
        imgW = containerSize * imgAspect;
      } else {
        imgW = containerSize;
        imgH = containerSize / imgAspect;
      }

      imgW *= scale;
      imgH *= scale;

      if (rotation % 180 !== 0) {
        [imgW, imgH] = [imgH, imgW];
      }

      const maxX = Math.max(0, (imgW - containerSize) / 2);
      const maxY = Math.max(0, (imgH - containerSize) / 2);

      return {
        x: Math.min(maxX, Math.max(-maxX, x)),
        y: Math.min(maxY, Math.max(-maxY, y)),
      };
    },
    [imgAspect, selectedImage]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const newSize = entry.contentRect.width;
      const oldSize = prevContainerSize.current;

      if (
        oldSize !== null &&
        oldSize !== newSize &&
        newSize > 0 &&
        transformsRef.current
      ) {
        const ratio = newSize / oldSize;
        const { x, y } = transformsRef.current;
        if (x !== 0 || y !== 0) {
          updatePosition(x * ratio, y * ratio);
        }
      }
      prevContainerSize.current = newSize;
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [updatePosition]);

  const startDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (activeTool !== "move" || !selectedImage || isSnapping) return;
      isDragging.current = true;
      setIsDraggingState(true);
      dragStart.current = {
        x: clientX - selectedImage.transforms.x,
        y: clientY - selectedImage.transforms.y,
      };
      setDragOffset({
        x: selectedImage.transforms.x,
        y: selectedImage.transforms.y,
      });
    },
    [activeTool, selectedImage, isSnapping]
  );

  const moveDrag = useCallback((clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const newX = clientX - dragStart.current.x;
    const newY = clientY - dragStart.current.y;
    setDragOffset({ x: newX, y: newY });
  }, []);

  const endDrag = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const clamped = clampPosition(dragOffset.x, dragOffset.y);
    const needsSnap = clamped.x !== dragOffset.x || clamped.y !== dragOffset.y;

    if (needsSnap) {
      setIsSnapping(true);
      requestAnimationFrame(() => {
        setDragOffset(clamped);
        setTimeout(() => {
          setIsSnapping(false);
          setIsDraggingState(false);
          updatePosition(clamped.x, clamped.y);
        }, 200);
      });
    } else {
      setIsDraggingState(false);
      updatePosition(clamped.x, clamped.y);
    }
  }, [dragOffset, updatePosition, clampPosition]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => startDrag(e.clientX, e.clientY),
    [startDrag]
  );
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => moveDrag(e.clientX, e.clientY),
    [moveDrag]
  );
  const handleMouseUp = useCallback(() => endDrag(), [endDrag]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (activeTool !== "move" || !selectedImage) return;
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    },
    [activeTool, selectedImage, startDrag]
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      moveDrag(touch.clientX, touch.clientY);
    },
    [moveDrag]
  );
  const handleTouchEnd = useCallback(() => endDrag(), [endDrag]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addImages(e.target.files);
        e.target.value = "";
      }
    },
    [addImages]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const { files } = e.dataTransfer;
      if (files.length > 0) {
        const imageFiles = new DataTransfer();
        Array.from(files).forEach((file) => {
          if (file.type.startsWith("image/")) {
            imageFiles.items.add(file);
          }
        });
        if (imageFiles.files.length > 0) {
          addImages(imageFiles.files);
        }
      }
    },
    [addImages]
  );

  if (!selectedImage) {
    return (
      <div
        className={cn(
          "gap-lg flex aspect-square w-full flex-col items-center justify-center border border-dashed border-neutral-500 bg-white transition-colors",
          isDragOver && "border-brand-orange-400 bg-brand-orange-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadSimple
          size={88}
          weight="thin"
          className={cn(
            "size-12 text-neutral-400 transition-colors md:size-auto",
            isDragOver && "text-brand-orange-400"
          )}
        />
        <Typography variant="heading-sm" weight="bold" className="text-center">
          Drag and drop images here
        </Typography>
        <Typography variant="body-md" color="secondary">
          or
        </Typography>
        <Button variant="primary" size="lg" onClick={() => uploadInputRef.current?.click()}>
          Choose file to upload
        </Button>
        <input
          ref={uploadInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    );
  }

  const { transforms } = selectedImage;
  const useOffset = isDraggingState || isSnapping;
  const currentX = useOffset ? dragOffset.x : transforms.x;
  const currentY = useOffset ? dragOffset.y : transforms.y;

  const scaleX = transforms.flipH ? -transforms.scale : transforms.scale;
  const scaleY = transforms.flipV ? -transforms.scale : transforms.scale;

  const transformStyle = [
    `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`,
    `scale(${scaleX}, ${scaleY})`,
    `rotate(${transforms.rotation}deg)`,
  ].join(" ");

  const imgSizeStyle: React.CSSProperties =
    imgAspect !== null && imgAspect >= 1
      ? { height: "100%", width: "auto" }
      : { width: "100%", height: "auto" };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={containerRef}
      className="relative aspect-square w-full overflow-hidden border-2 border-neutral-200"
      style={{ cursor: activeTool === "move" ? "grab" : "default" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={selectedImage.previewUrl}
        alt=""
        className="absolute top-1/2 left-1/2 max-h-none max-w-none select-none"
        style={{
          ...imgSizeStyle,
          transform: transformStyle,
          transition: isSnapping ? "transform 200ms ease-out" : "none",
          filter:
            selectedImage.imageStyle === EImageStyle.BLACK_AND_WHITE ? "grayscale(100%)" : "none",
        }}
        onLoad={handleImageLoad}
        draggable={false}
      />
      {studioMode === "badge" && (
        <>
          {!badgeConfig.extendToEdge && (
            <>
              <div className="pointer-events-none absolute inset-[1.5rem] border border-dashed border-white/60" />
              <span className="pointer-events-none absolute top-[0.5rem] left-[1.5rem] text-[0.625rem] text-white/80">
                Trim line
              </span>
            </>
          )}
          <BadgeOverlay />
        </>
      )}
    </div>
  );
};
