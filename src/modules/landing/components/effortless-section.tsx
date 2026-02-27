import { SliderComparison } from "@/shared";

const features = [
  {
    id: 1,
    title: "PRINT QUALITY THAT POPS.",
    description: "Rich color, sharp detail, and a clean matte look that feels at home in any room.",
  },
  {
    id: 2,
    title: "BUILT FOR SWAPPING.",
    description: "Stick, re-stick, and rearrange. Keep your wall updated without new holes.",
  },
  {
    id: 3,
    title: "SIMPLE LAYOUTS.",
    description: "Start with a grid, expand later, or go full collage—your wall, your rhythm.",
  },
];

export const EffortlessSection = () => {
  return (
    <section className="p-7xl gap-8xl flex flex-col">
      {/* Section Header */}
      <div className="text-center">
        <p className="body-sm mb-3 tracking-widest text-neutral-500 uppercase">
          PERSONALIZED WALL DECOR, MADE EASY // GET YOURS NOW
        </p>
        <h2 className="font-heading text-3xl font-bold uppercase md:text-4xl lg:text-5xl">
          DECORATING MADE EFFORTLESS.
        </h2>
      </div>

      {/* Slider Comparison */}
      <SliderComparison
        leftUrl="/images/effortless-section-left.png"
        rightUrl="/images/effortless-section-right.png"
        className="max-h-[500px]"
      />

      {/* Feature Cards */}
      <div className="gap-4xl grid md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.id} className="group overflow-hidden rounded-lg bg-white">
            <div className="">
              <h3 className="font-heading mb-2 text-lg font-bold uppercase">{feature.title}</h3>
              <p className="body-sm text-neutral-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
