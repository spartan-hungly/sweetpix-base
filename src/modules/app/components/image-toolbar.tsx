"use client";

import type { Icon } from "@phosphor-icons/react";
import {
  ArrowClockwise,
  ArrowsHorizontal,
  ArrowsOutCardinal,
  FrameCorners,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  Trash,
} from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { Typography } from "@/shared";

import { useImageEditor } from "../hooks";

interface ToolAction {
  id: string;
  label: string;
  icon: Icon;
  action: () => void;
  isToggle?: boolean;
}

export const ImageToolbar = () => {
  const { selectedImage, activeTool, zoomIn, zoomOut, rotate, flip, reset, removeImage, toggleMoveTool } =
    useImageEditor();

  const tools: ToolAction[] = [
    { id: "move", label: "Move", icon: ArrowsOutCardinal, action: toggleMoveTool, isToggle: true },
    { id: "zoom-in", label: "Zoom In", icon: MagnifyingGlassPlus, action: zoomIn },
    { id: "zoom-out", label: "Zoom Out", icon: MagnifyingGlassMinus, action: zoomOut },
    { id: "rotate", label: "Rotate", icon: ArrowClockwise, action: rotate },
    { id: "flip", label: "Flip", icon: ArrowsHorizontal, action: flip },
    { id: "reset", label: "Reset", icon: FrameCorners, action: reset },
    {
      id: "remove",
      label: "Remove",
      icon: Trash,
      action: () => selectedImage && removeImage(selectedImage.id),
    },
  ];

  const isDisabled = !selectedImage;

  return (
    <div className="flex items-center justify-between overflow-x-auto border border-secondary bg-white px-xl py-lg md:px-4xl md:py-2xl">
      {tools.map((tool) => {
        const isActive = tool.isToggle && activeTool === "move";
        const ToolIcon = tool.icon;
        return (
          <button
            key={tool.id}
            onClick={tool.action}
            disabled={isDisabled}
            className={cn(
              "flex flex-1 shrink-0 cursor-pointer flex-col items-center justify-center gap-[0.265rem]",
              "disabled:cursor-not-allowed disabled:opacity-40",
              isActive ? "text-brand-orange-500" : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            <div className="flex size-[1.5rem] items-center justify-center">
              <ToolIcon size={20} />
            </div>
            <Typography as="span" variant="body-xs" weight="medium" color={undefined}>
              {tool.label}
            </Typography>
          </button>
        );
      })}
    </div>
  );
};
