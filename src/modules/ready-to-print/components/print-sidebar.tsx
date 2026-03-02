import { useAtom } from "jotai";

import { selectedPrintTileAtom } from "@/modules/app/store";
import { Separator, Typography } from "@/shared";

import type { PrintTile } from "../types";

type PrintSidebarProps = {
  selectedItems: PrintTile[];
};

export const PrintSidebar = ({ selectedItems }: PrintSidebarProps) => {
  const [selectedPrintTile, setSelectedPrintTile] = useAtom(selectedPrintTileAtom);

  const handleToggleSelect = (item: PrintTile) => {
    setSelectedPrintTile(item);
  };

  return (
    <section className="border-secondary flex flex-col border-b bg-white sm:h-[calc(100vh-75px)] sm:border-r">
      <div className="p-4xl">
        <Typography
          variant="heading-sm"
          weight="bold"
          className="tracking-wide whitespace-nowrap uppercase"
        >
          Ready to print
        </Typography>
      </div>

      <Separator />

      <div className="gap-md px-4xl py-2xl flex items-center justify-between">
        <Typography
          variant="body-sm"
          className="font-heading text-tertiary tracking-wide uppercase"
        >
          Image count: {selectedItems.length}
        </Typography>
      </div>

      <Separator />

      <div className="gap-xl p-4xl grid overflow-y-auto sm:grid-cols-2">
        {selectedItems.map((item) => (
          <SelectedItemRenderer
            key={item.id}
            item={item}
            isSelected={item.id === selectedPrintTile?.id}
            onToggleSelect={() => handleToggleSelect(item)}
          />
        ))}
      </div>
    </section>
  );
};

const SelectedItemRenderer = ({
  item,
  isSelected,
  onToggleSelect,
}: {
  item: PrintTile;
  isSelected: boolean;
  onToggleSelect: () => void;
}) => {
  return (
    <button type="button" className="gap-md flex flex-col items-center" onClick={onToggleSelect}>
      <div className="relative w-full max-w-[200px] overflow-hidden rounded-sm sm:max-w-[150px]">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.printId}
            className="aspect-square h-auto w-full object-cover"
          />
        ) : null}
        {isSelected && (
          <span className="bg-brand-orange-500 body-xs absolute top-2 right-4 inline-flex size-6 items-center justify-center rounded-full font-bold text-white">
            ✓
          </span>
        )}
      </div>
      <Typography variant="body-sm" className="max-w-full truncate">
        {item.title}
      </Typography>
    </button>
  );
};
