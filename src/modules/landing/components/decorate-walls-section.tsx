"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, PlayCircleIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";
import Image from "next/image";

import { Typography } from "@/shared";

const benefits = [
  "Decorate with your pics",
  "Select, crop & submit",
  "No wall damage",
  "Won't fade or warp",
  "Free shipping*",
];

const carouselImages = [
  {
    id: 1,
    src: "/images/decorate-01.png",
    alt: "Photo frame display 1",
    label: "Wood-finish photo frames",
  },
  {
    id: 2,
    src: "/images/decorate-02.png",
    alt: "Photo frame display 2",
    label: "Modern minimalist frames",
  },
  {
    id: 3,
    src: "/images/decorate-03.png",
    alt: "Photo frame display 3",
    label: "Gallery wall layouts",
  },
];

export const DecorateWallsSection = () => {
  const [activeImage, setActiveImage] = useState(0);

  const handlePrev = () => {
    setActiveImage((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImage((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="p-7xl">
      <div className="gap-4xl grid lg:grid-cols-2 lg:items-center lg:gap-0">
        {/* Left Content */}
        <div className="gap-8xl flex max-w-[500px] flex-col">
          <div className="gap-2xl flex flex-col">
            <Typography variant="heading-lg" className="font-heading uppercase">
              DECORATE YOUR WALLS
              <br />
              WITH LOVE
            </Typography>
            <Typography variant="body-md" color="secondary">
              Discover how our customers have revamped their spaces with Sweet Pix premium 8×8"
              photo tiles!
            </Typography>
          </div>

          <ul className="border-secondary flex flex-col border-t">
            {benefits.map((benefit, index) => (
              <li key={index} className="border-secondary py-3xl flex items-center gap-3 border-b">
                <Typography variant="body-md" color="secondary">
                  {benefit}
                </Typography>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content - Image Carousel */}
        <div className="relative">
          <div className="relative m-auto aspect-3/4 max-h-[80vh] overflow-hidden rounded-lg">
            <Image
              src={carouselImages[activeImage].src}
              alt={carouselImages[activeImage].alt}
              fill
              className="object-cover"
            />
            {/* Video Play Button Overlay */}
            <button className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 transition-all hover:bg-white">
              <PlayCircleIcon size={20} weight="fill" className="text-black" />
              <span className="body-sm font-medium">{carouselImages[activeImage].label}</span>
            </button>
          </div>

          {/* Carousel Navigation */}
          <div className="gap-4xl mt-4 flex items-center justify-center">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 transition-colors hover:bg-neutral-100"
              aria-label="Previous image"
            >
              <ArrowLeftIcon size={20} />
            </button>
            <div className="flex gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    activeImage === index ? "w-8 bg-black" : "bg-neutral-300"
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 transition-colors hover:bg-neutral-100"
              aria-label="Next image"
            >
              <ArrowRightIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
