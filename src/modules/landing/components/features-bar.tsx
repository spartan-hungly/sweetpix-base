import Image from "next/image";

import { Typography } from "@/shared";

const features = [
  {
    image: "/images/made-in-usa.png",
    title: "MADE IN THE USA",
    description:
      "We are very proud to say that Sweet Pix, our process, materials, and printers are all made HERE in the USA!",
  },
  {
    image: "/images/uv-and-water.png",
    title: "UV & WATER RESISTANT",
    description:
      "All Sweet Pix photo tiles are water & UV resistant which means they will never fade, warp or delaminate.",
  },
  {
    image: "/images/shipped-free.png",
    title: "SHIPPED FREE",
    description:
      "All Sweet Pix Photo Tiles are delivered with FREE Shipping in the US and are delivered to your doorstep within 3 – 5 days. ",
  },
];

export const FeaturesBar = () => {
  return (
    <section className="p-7xl bg-white">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
        {features.map((feature, index) => (
          <div key={index} className="gap-4xl flex flex-col lg:flex-row">
            <div className="flex h-[210px] w-[172px] shrink-0 items-center justify-center">
              <Image
                src={feature.image}
                alt={feature.title}
                width={172}
                height={210}
                className="max-h-[210px] min-h-[210px] max-w-[172px] min-w-[172px] object-cover"
              />
            </div>
            <div className="flex h-full flex-col lg:justify-center">
              <Typography variant="body-lg" className="font-heading uppercase">
                {feature.title}
              </Typography>
              <Typography variant="body-sm">{feature.description}</Typography>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
