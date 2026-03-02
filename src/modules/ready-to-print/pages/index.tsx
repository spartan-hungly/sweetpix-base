"use client";

import { Typography } from "@/shared";

import { PrintSidebar } from "../components";
import { usePrintTiles } from "../hooks/use-print-tiles";
import type { ReadyToPrintItem } from "../types";

const readyToPrintItems: ReadyToPrintItem[] = [
  {
    id: "print-1",
    title: "Accomplish - There is no limit",
    imageUrl: "/images/ready-to-print/accomplish.png",
  },
  {
    id: "print-2",
    title: "Proud to Call KW Home",
    imageUrl: "/images/ready-to-print/kw-home.png",
  },
  {
    id: "print-3",
    title: "Accomplish - There is no limit",
    imageUrl: "/images/ready-to-print/accomplish.png",
  },
  {
    id: "print-4",
    title: "Proud to Call KW Home",
    imageUrl: "/images/ready-to-print/kw-home.png",
  },
  {
    id: "print-5",
    title: "Accomplish - There is no limit",
    imageUrl: "/images/ready-to-print/accomplish.png",
  },
  {
    id: "print-6",
    title: "Proud to Call KW Home",
    imageUrl: "/images/ready-to-print/kw-home.png",
  },
  {
    id: "print-7",
    title: "Accomplish - There is no limit",
    imageUrl: "/images/ready-to-print/accomplish.png",
  },
  {
    id: "print-8",
    title: "Proud to Call KW Home",
    imageUrl: "/images/ready-to-print/kw-home.png",
  },
  {
    id: "print-9",
    title: "Accomplish - There is no limit",
    imageUrl: "/images/ready-to-print/accomplish.png",
  },
  {
    id: "print-10",
    title: "Proud to Call KW Home",
    imageUrl: "/images/ready-to-print/kw-home.png",
  },
  {
    id: "print-11",
    title: "Accomplish - There is no limit",
    imageUrl: "/images/ready-to-print/accomplish.png",
  },
  {
    id: "print-12",
    title: "Proud to Call KW Home",
    imageUrl: "/images/ready-to-print/kw-home.png",
  },
];

export const ReadyToPrintPage = () => {
  const { tiles, addTile } = usePrintTiles(readyToPrintItems);

  return (
    <div className="bg-secondary grid h-full grid-cols-1 md:grid-cols-[360px_1fr]">
      {/* Left sidebar - selected images */}
      <div>
        <div className="bg-white sm:sticky sm:top-0">
          <PrintSidebar selectedItems={tiles} />
        </div>
      </div>

      {/* Right content - image grid */}
      <section className="px-4xl py-4xl bg-neutral-50">
        <div className="mx-auto">
          <div className="gap-4xl grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {readyToPrintItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => addTile(item)}
                className="gap-xl flex flex-col items-center text-left"
              >
                <div className="relative w-full overflow-hidden rounded-sm">
                  <div className="m-auto max-w-[200px]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="aspect-square h-auto w-full object-cover"
                    />
                  </div>
                </div>
                <Typography variant="body-md" className="max-w-full truncate">
                  {item.title}
                </Typography>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
