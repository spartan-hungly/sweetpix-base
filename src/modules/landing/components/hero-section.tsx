"use client";

import { useState } from "react";
import { cn } from "@tailwind-config/utils/cn";
import Image from "next/image";

import { ArrowLeftIcon, ArrowRightIcon, Button, Typography, useSmaller } from "@/shared";

const heroSlides = [
  {
    id: 1,
    image: "/images/home-slider-01.png",
  },
  {
    id: 2,
    image: "/images/home-slider-02.png",
  },
  {
    id: 3,
    image: "/images/home-slider-03.png",
  },
];

export const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const isTablet = useSmaller("md");

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative h-[700px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroSlides[activeSlide].image}
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="px-7xl relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center">
        <div className="mt-[300px]">
          <div className={cn("flex", isTablet ? "gap-4xl flex-col" : "items-end justify-between")}>
            <Typography
              // variant={isTablet ? "heading-lg" : isMobile ? "heading-md" : "display-large"}
              color="white"
              className="font-heading max-w-[700px] text-4xl uppercase md:text-5xl lg:text-7xl"
            >
              Turn phone photos into a wall you’ll actually keep updated.
            </Typography>

            <Button
              variant="primary"
              size="lg"
              className="px-6xl py-xl! rounded-full bg-white font-medium text-black hover:bg-neutral-100"
            >
              Start your wall
            </Button>
          </div>
        </div>
        <div className="py-4xl flex items-center justify-between gap-4">
          {/* Navigation Arrows */}
          <Button
            onClick={goToPrevSlide}
            aria-label="Previous slide"
            startIcon={<ArrowLeftIcon className="text-white" />}
            iconOnly
            className="border-0 bg-transparent text-white transition-all hover:bg-white/20"
          />
          {/* Carousel Dots */}
          <div className="flex gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  activeSlide === index ? "w-8 bg-white" : "bg-white/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <Button
            onClick={goToNextSlide}
            aria-label="Next slide"
            endIcon={<ArrowRightIcon className="text-white" />}
            iconOnly
            className="border-0 bg-transparent text-white transition-all hover:bg-white/20"
          />
        </div>
      </div>
    </section>
  );
};
