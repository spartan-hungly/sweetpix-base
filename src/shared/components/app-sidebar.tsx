"use client";

import { useEffect, useState } from "react";
import { ArrowDownIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  checkActiveItem,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuIcon,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/shared";

import { MainSidebar } from "../constants/sidebar.constant";
import { SearchParams } from "../enums";

export const AppSidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get(SearchParams.View);
  const isSettings = pathname.startsWith("/settings");
  const { state, isMobile, setOpen } = useSidebar();

  useEffect(() => {
    if (isSettings && state === "expanded") {
      setOpen(false);
    }
  }, [isSettings, state, setOpen]);

  return (
    <Sidebar side={isMobile ? "bottom" : "left"} variant="sidebar" collapsible="icon">
      {!isMobile && (
        <SidebarHeader>
          <div
            className={cn("flex items-center justify-between", {
              "gap-md flex-col": state === "collapsed",
            })}
          >
            <Image
              src={
                state === "collapsed" ? "/images/reviva-logo.png" : "/images/reviva-full-logo.png"
              }
              alt="Reviva"
              width={state === "collapsed" ? 40 : 100}
              height={state === "collapsed" ? 35 : 28}
              priority
            />
            {!isSettings ? <SidebarTrigger /> : null}
          </div>
        </SidebarHeader>
      )}

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {MainSidebar.map((item) => {
              const haveChildren = item.items && item.items.length > 0;
              const isActiveItem = checkActiveItem(item, pathname, view);
              return haveChildren ? (
                <CollapsibleSidebarItem key={item.title} item={item} isActiveItem={isActiveItem} />
              ) : (
                <SidebarItem key={item.title} item={item} isActiveItem={isActiveItem} />
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {!isSettings ? <SidebarRail /> : null}
    </Sidebar>
  );
};

const SidebarItem = ({
  item,
  isActiveItem,
}: {
  item: (typeof MainSidebar)[number];
  isActiveItem: boolean;
}) => {
  const { isMobile, state } = useSidebar();

  return (
    <SidebarMenuItem>
      <Link href={item.url}>
        <SidebarMenuButton tooltip={item.title} isActive={isActiveItem}>
          {item.icon && <SidebarMenuIcon icon={item.icon} />}
          {!isMobile && state === "expanded" ? item.title : null}
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};

const CollapsibleSidebarItem = ({
  item,
  isActiveItem,
}: {
  item: (typeof MainSidebar)[number];
  isActiveItem: boolean;
}) => {
  const searchParams = useSearchParams();
  const view = searchParams.get(SearchParams.View);
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState(isActiveItem);

  useEffect(() => {
    setIsOpen(isActiveItem);
  }, [isActiveItem]);

  const checkIsActiveSubItem = (url: string) => {
    if (!url) return false;
    if (view) {
      return url === `${pathname}?${SearchParams.View}=${view}`;
    }
    return pathname.startsWith(url);
  };

  if (state === "collapsed") {
    return (
      <SidebarMenuItem>
        <Menu>
          <MenuTrigger
            nativeButton={false}
            openOnHover={!isMobile}
            render={
              <Link
                href={item.url}
                className="group flex size-12 items-center justify-center rounded-md ring-0 outline-none"
              />
            }
          >
            {item.icon && <SidebarMenuIcon icon={item.icon} />}
          </MenuTrigger>
          <MenuContent
            side={isMobile ? "top" : "right"}
            align="start"
            sideOffset={12}
            className="min-w-[200px]"
          >
            {item.items?.map((subItem) => {
              const isActiveSubItem = checkIsActiveSubItem(subItem.url);
              return (
                <Link href={subItem.url} key={subItem.title} className="ring-0 outline-none">
                  <MenuItem
                    key={subItem.title}
                    className={cn("p-lg! ring-0 outline-none", {
                      "text-brand-tertiary": isActiveSubItem,
                      "bg-primary-hover": isActiveSubItem,
                    })}
                  >
                    {subItem.title}
                  </MenuItem>
                </Link>
              );
            })}
          </MenuContent>
        </Menu>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger
          nativeButton={false}
          render={
            <Link href={item.url} className="group">
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <SidebarMenuIcon icon={item.icon} />}
                {item.title}
                {
                  <ArrowDownIcon
                    size={16}
                    className="text-quaternary ml-auto transition-transform duration-200 group-data-panel-open:rotate-180"
                  />
                }
              </SidebarMenuButton>
            </Link>
          }
        />
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => {
              const isActiveSubItem = checkIsActiveSubItem(subItem.url);
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <Link href={subItem.url}>
                    <SidebarMenuSubButton isActive={isActiveSubItem}>
                      {subItem.title}
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
