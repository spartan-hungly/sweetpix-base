import Image from "next/image";

import { Button, Typography } from "@/shared";

export const CTASection = () => {
  return (
    <section className="relative h-[500px] w-full overflow-hidden md:h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/action-image.png"
          alt="Room with photo wall"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h2 className="font-heading mb-4 text-4xl font-bold text-white uppercase md:text-5xl lg:text-6xl">
          UPGRADE YOUR
          <br />
          SPACE TODAY.
        </h2>
        <Typography variant="body-md" color="white" className="mb-8">
          Join 250,000+ users and see what they call the easiest way to decorate!
        </Typography>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            className="px-6xl rounded-full bg-white text-black hover:bg-neutral-100"
          >
            Start your wall
          </Button>
          <Button
            variant="outlined-primary"
            size="lg"
            className="px-6xl rounded-full border-white text-white hover:bg-white hover:text-black"
          >
            Shop Gallery Layouts
          </Button>
        </div>
      </div>
    </section>
  );
};
