import { Star } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Typography, YoutubeEmbed } from "@/shared";

const testimonials = [
  {
    id: 1,
    rating: 5,
    title: "Love These Tiles",
    review:
      "This was such an easy way to decorate. My grandkids love it & think it's funny to see their pics on the wall. I recommend it to all my friends!",
    author: "Deb B.",
    verified: true,
  },
  {
    id: 2,
    rating: 5,
    title: "Grandmother Approved!",
    review:
      "This was such an easy way to decorate. My grandkids love it & think it's funny to see their pics on the wall. I recommend it to all my friends!",
    author: "Deb B.",
    verified: true,
  },
  {
    id: 3,
    rating: 5,
    title: "Great Quality!",
    review:
      "This was such an easy way to decorate. My grandkids love it & think it's funny to see their pics on the wall. I recommend it to all my friends!",
    author: "Deb B.",
    verified: true,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="p-7xl bg-white">
      {/* Testimonials Grid */}
      <div className="gap-6xl flex flex-col">
        <Typography variant="body-sm" color="secondary" className="text-center">
          Check out our mention on Redfin.com about how to{" "}
          <Link
            href="https://www.redfin.com/blog/transform-your-bedroom-into-the-ultimate-sanctuary-with-these-expert-tips/"
            className="text-success font-medium underline"
          >
            Personalize with your Favorite Things
          </Link>
        </Typography>
        <YoutubeEmbed embedId="_3yrgnso0A0" />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-secondary rounded-lg p-6">
              {/* Star Rating */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} weight="fill" className="text-yellow-400" />
                ))}
              </div>

              {/* Title */}
              <h3 className="font-heading mb-2 text-lg font-bold">{testimonial.title}</h3>

              {/* Review */}
              <p className="body-sm mb-4 text-neutral-600">{testimonial.review}</p>

              {/* Author */}
              <div className="flex items-center gap-2">
                <span className="body-sm font-medium">{testimonial.author}</span>
                {testimonial.verified && (
                  <span className="body-xs text-green-600">Verified Buyer</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
