import Image from "next/image";

import { Typography } from "@/shared";

const logos = [
  { id: 1, name: "Our Whiskey Lullaby", label: "01", image: "/images/our-whiskey-lullaby.png" },
  { id: 2, name: "Mommyhood Chronicles", label: "02", image: "/images/mommyhood-chronicles.png" },
  { id: 3, name: "The Baby Laundry", label: "03", image: "/images/baby-laundry.png" },
  { id: 4, name: "Great Apps", label: "04", image: "/images/great-apps.png" },
  { id: 5, name: "Babes and Kids", label: "05", image: "/images/babes-and-kids.png" },
  { id: 6, name: "Virtually Yours", label: "06", image: "/images/virtually-yours.png" },
];

export const LovedBySection = () => {
  return (
    <section className="p-7xl">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <Typography variant="heading-lg" className="font-heading uppercase">
          WE&apos;RE LOVED BY
        </Typography>
      </div>

      {/* Logo Grid */}
      <div className="gap-4xl grid grid-cols-2 md:grid-cols-3">
        {logos.map((logo) => (
          <div key={logo.id} className="border-secondary pt-4xl pb-8xl flex flex-col border-t">
            <Typography variant="body-xl" color="secondary" className="font-heading">
              {logo.label}
            </Typography>
            <div className="m-auto max-w-[230px]">
              <Image
                src={logo.image}
                alt={logo.name}
                className="object-contain grayscale"
                width={230}
                height={100}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
