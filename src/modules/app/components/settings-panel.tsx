"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { Typography } from "@/shared";
import { useSmaller } from "@/shared/hooks/useBreakpoint";

interface SettingsPanelProps {
  title: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

export const SettingsPanel = ({ title, headerAction, children }: SettingsPanelProps) => {
  const isMobile = useSmaller("lg");
  const [collapsed, setCollapsed] = useState(true);

  const isCollapsed = isMobile && collapsed;

  const handleClick = () => {
    if (isMobile) {
      setCollapsed((prev) => !prev);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <aside
      className={cn(
        "border-secondary flex shrink-0 flex-col bg-white",
        "w-full border-b lg:h-full lg:w-90.75 lg:border-r lg:border-b-0"
      )}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "border-secondary p-3xl lg:p-4xl flex h-14 items-center justify-between border-b lg:h-18",
          isMobile && "cursor-pointer"
        )}
      >
        <Typography as="h2" variant="body-xl" font="heading" className="leading-[1.5rem] uppercase">
          {title}
        </Typography>
        <div className="gap-md flex items-center">
          {headerAction}
          {isMobile && (
            <CaretDown
              size={20}
              className={cn("text-neutral-500 transition-transform", !collapsed && "rotate-180")}
            />
          )}
        </div>
      </div>
      {!isCollapsed && <div className="pt-xl flex-1 overflow-y-auto">{children}</div>}
    </aside>
  );
};
