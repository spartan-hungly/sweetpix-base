"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { cn } from "@tailwind-config/utils/cn";

// import { useComparisonContainerStyle } from "./use-comparison-container-style";

type SliderComparisonProps = {
  leftUrl: string;
  rightUrl: string;
  className?: string;
};

export function SliderComparison({ leftUrl, rightUrl, className }: SliderComparisonProps) {
  // const { containerStyle } = useComparisonContainerStyle({ leftUrl, rightUrl });

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg",
        className
      )}
    >
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={leftUrl}
            alt="Left comparison"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={rightUrl}
            alt="Right comparison"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        }
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
