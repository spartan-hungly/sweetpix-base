"use client";

import { useState } from "react";
import { cn } from "@tailwind-config/utils/cn";
import Image from "next/image";

import { Typography } from "@/shared";

const steps = [
  {
    id: 1,
    title: "SELECT YOUR PHOTOS",
    description:
      "Choose your favorite moments directly from your phone's camera roll, Instagram, or Google Photos using our beautifully intuitive app or website interface.",
    images: ["/images/how-it-works-step1-app.png", "/images/how-it-works-step1-print.png"],
  },
  {
    id: 2,
    title: "WE PRINT AND FRAME",
    description:
      "Your selected photos are printed with museum-quality inks on durable, lightweight materials, ensuring vibrant, accurate colors that are built to last.",
    images: ["/images/how-it-works-step1-app.png", "/images/how-it-works-step1-print.png"],
  },
  {
    id: 3,
    title: "STICK, ARRANGE, ADMIRE",
    description:
      "Simply peel and stick your photos to any wall surface. Rearrange as often as you like without damaging your walls or photos.",
    images: ["/images/how-it-works-step1-app.png", "/images/how-it-works-step1-print.png"],
  },
];

export const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(1);

  const currentStep = steps.find((step) => step.id === activeStep);

  return (
    <section className="p-7xl">
      {/* Section Header */}
      <div className="mb-12 text-center md:mb-16 lg:mb-20">
        <Typography
          variant="heading-lg"
          className="font-heading text-3xl font-black tracking-tight uppercase md:text-4xl lg:text-5xl"
        >
          HOW SWEETPIX WORKS
        </Typography>
      </div>

      {/* Steps Content */}
      <div className="border-secondary border">
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col gap-8 lg:hidden">
          {/* Steps List */}
          <div className="flex flex-col gap-6">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className="text-left transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`text-2xl font-bold ${
                      activeStep === step.id ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {step.id}
                  </span>
                  <Typography
                    variant="body-lg"
                    className={`font-heading text-sm font-bold tracking-wide uppercase md:text-base ${
                      activeStep === step.id ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {step.title}
                  </Typography>
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          {currentStep && (
            <div className="flex flex-col gap-8">
              <Typography
                variant="body-md"
                className="text-sm leading-relaxed text-gray-700 md:text-base"
              >
                {currentStep.description}
              </Typography>

              {/* Images */}
              <div className="flex flex-col gap-6">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={currentStep.images[0]}
                    alt={`${currentStep.title} - Image 1`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={currentStep.images[1]}
                    alt={`${currentStep.title} - Image 2`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop/Tablet Layout - Side by Side */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-[300px_1fr] xl:grid-cols-[500px_1fr]">
            {/* Left Side - Steps List */}
            <div className="gap-4xl border-secondary p-5xl flex flex-col border-r">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className="text-left transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="border-secondary p-md flex size-10 items-center justify-center rounded-full border">
                      <Typography
                        className={cn(
                          "text-xl font-bold",
                          activeStep === step.id ? "text-black" : "text-gray-300"
                        )}
                      >
                        {step.id}
                      </Typography>
                    </div>
                    <Typography
                      variant="body-lg"
                      className={cn(
                        "font-heading text-base font-bold tracking-wide uppercase xl:text-lg",
                        activeStep === step.id ? "text-black" : "text-gray-300"
                      )}
                    >
                      {step.title}
                    </Typography>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Side - Active Step Content */}
            {currentStep && (
              <div className="p-8xl flex flex-col items-end gap-12">
                {/* First Image and Description */}
                <div className="flex w-full flex-col items-end justify-between gap-8 xl:flex-row">
                  <Typography variant="body-md" className="max-w-[300px] text-base leading-relaxed">
                    {currentStep.description}
                  </Typography>
                  <div className="relative aspect-4/3 w-full max-w-[500px] overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                    <Image
                      src={currentStep.images[0]}
                      alt={`${currentStep.title} - Image 1`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Second Image */}
                <div className="relative aspect-video w-full max-w-[500px] overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                  <Image
                    src={currentStep.images[1]}
                    alt={`${currentStep.title} - Image 2`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
