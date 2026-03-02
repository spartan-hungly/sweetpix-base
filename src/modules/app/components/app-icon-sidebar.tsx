"use client";

import { useRouter } from "@bprogress/next/app";
import type { Icon } from "@phosphor-icons/react";
import { ImageIcon, MedalIcon, PaintBrushBroadIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";

import { Typography } from "@/shared";

import { EStudioMode } from "../enums";
import { studioModeAtom } from "../store";

interface SidebarTab {
  id: EStudioMode;
  label: string;
  icon: Icon;
}

const tabs: SidebarTab[] = [
  { id: EStudioMode.PHOTO, label: "Photo", icon: ImageIcon },
  { id: EStudioMode.BADGE, label: "Badge", icon: MedalIcon },
  { id: EStudioMode.PRINT, label: "Print", icon: PaintBrushBroadIcon },
];

export const AppIconSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useAtom(studioModeAtom);

  const handleClick = (tab: EStudioMode) => () => {
    setActiveTab(tab);
    if (!pathname.startsWith(`/studio`)) {
      router.push(`/studio`);
    }
  };

  return (
    <aside
      className={cn(
        "flex bg-white",
        "gap-sm border-secondary px-lg py-sm flex-row border-b",
        "lg:gap-xl lg:px-lg lg:py-lg lg:h-full lg:flex-col lg:border-r lg:border-b-0"
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={handleClick(tab.id)}
            className={cn(
              "gap-sm flex w-14 cursor-pointer flex-col items-center justify-center py-1.75",
              isActive ? "text-brand-orange-500" : "text-neutral-600 hover:text-neutral-800"
            )}
          >
            <tab.icon size={24} />
            <Typography
              as="span"
              variant="body-xs"
              weight="medium"
              className="leading-[1.2]"
              color={undefined}
            >
              {tab.label}
            </Typography>
          </button>
        );
      })}
    </aside>
  );
};
