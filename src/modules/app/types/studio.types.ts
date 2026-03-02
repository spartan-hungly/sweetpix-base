import { EImageStyle, ETileSize } from "../enums";

export interface ImageTransforms {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  flipH: boolean;
  flipV: boolean;
}

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  transforms: ImageTransforms;
  tileSize: ETileSize;
  imageStyle: EImageStyle;
  badgeConfig: BadgeConfig;
}

export type ToolMode = "move" | null;

export type TextCase = "uppercase" | "lowercase";

export type BadgePosition = "left" | "right";

export interface BadgeConfig {
  enabled: boolean;
  font: string;
  textColor: string;
  fontSize: number;
  textCase: TextCase;
  addTitle: boolean;
  name: string;
  title: string;
  badgeColor: string;
  position: BadgePosition;
  extendToEdge: boolean;
}

export const DEFAULT_TRANSFORMS: ImageTransforms = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  flipH: false,
  flipV: false,
};

export const DEFAULT_TILE_SIZE: ETileSize = ETileSize.EIGHT_BY_EIGHT;

export const DEFAULT_IMAGE_STYLE: EImageStyle = EImageStyle.FULL_COLOR;

export const DEFAULT_BADGE_CONFIG: BadgeConfig = {
  enabled: true,
  font: "helvetica-neue-bold",
  textColor: "#FFFFFF",
  fontSize: 31,
  textCase: "uppercase",
  addTitle: true,
  name: "",
  title: "",
  badgeColor: "#1F5B65",
  position: "right",
  extendToEdge: false,
};

export const FONT_OPTIONS = [
  { label: "Helvetica Neue Bold 77", value: "helvetica-neue-bold" },
  { label: "Arial Bold", value: "arial-bold" },
  { label: "Roboto Bold", value: "roboto-bold" },
  { label: "Inter Bold", value: "inter-bold" },
] as const;

export const FONT_SIZE_OPTIONS = [
  { label: "24", value: 24 },
  { label: "28", value: 28 },
  { label: "31", value: 31 },
  { label: "36", value: 36 },
  { label: "42", value: 42 },
] as const;

export const BADGE_POSITION_OPTIONS = [
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
] as const;

export const SCALE_STEP = 0.1;
export const SCALE_MIN = 0.1;
export const SCALE_MAX = 3;
export const ROTATION_STEP = 90;
