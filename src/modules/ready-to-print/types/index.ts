import type { ETileSize } from "@/modules/app/enums";

export type ReadyToPrintItem = {
  id: string;
  title: string;
  imageUrl: string;
};

export type PrintTile = {
  id: string;
  printId: string;
  tileSize: ETileSize;
  imageUrl: string;
  title: string;
};
