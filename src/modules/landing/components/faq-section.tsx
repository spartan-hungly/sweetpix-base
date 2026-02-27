"use client";

import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "Does this work with small dogs or only real dogs?",
    answer:
      "SweetPix works with any photos from your phone! Whether it's your small dog, big dog, cat, family photos, or vacation memories - we print them all in stunning quality.",
  },
  {
    id: 2,
    question: "How much do they cost?",
    answer:
      "Our photo tiles start at $8 per tile. We offer bundle discounts for larger orders, with free shipping on all US orders.",
  },
  {
    id: 3,
    question: "Are they really waterproof & UV resistant?",
    answer:
      "Yes! Our tiles are made with UV-resistant and water-resistant materials, making them perfect for bathrooms, kitchens, and outdoor covered areas.",
  },
  {
    id: 4,
    question: "Are they safe to put in a bathroom?",
    answer:
      "Absolutely! Our tiles are designed to withstand humid environments like bathrooms. The waterproof coating protects your photos from moisture damage.",
  },
  {
    id: 5,
    question: "How long does it take to receive my order?",
    answer:
      "Most orders ship within 3-5 business days. Delivery typically takes an additional 3-7 business days depending on your location.",
  },
  {
    id: 6,
    question: "How do they stick to wall?",
    answer:
      "Our tiles use a special adhesive backing that sticks to most surfaces without damaging your walls. They can be easily removed and repositioned.",
  },
  {
    id: 7,
    question: "How big are Sweet Pix?",
    answer:
      'Our standard tiles are 8"x8". We also offer larger sizes including 12"x12" for those who want bigger prints.',
  },
  {
    id: 8,
    question: "How much is shipping?",
    answer:
      "Shipping is FREE for all US orders! International shipping rates vary by destination.",
  },
  {
    id: 9,
    question: "Refund / Replacement Policy",
    answer:
      "We offer a 100% satisfaction guarantee. If you're not happy with your order, contact us within 30 days for a full refund or replacement.",
  },
  {
    id: 10,
    question: "How do I place an order?",
    answer:
      'Simply visit our shop, select your tile size and quantity, upload your photos, and checkout. It\'s that easy!',
  },
  {
    id: 11,
    question: "Do you ship internationally?",
    answer:
      "Yes! We ship to Canada, UK, Australia, and many other countries. International shipping rates apply.",
  },
  {
    id: 12,
    question: "Where can I get the Sweet Pix App?",
    answer:
      "Download our free app from the App Store (iOS) or Google Play Store (Android) to easily select and upload photos from your phone.",
  },
];

export const FAQSection = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[350px_1fr] lg:gap-16">
          {/* Left Side - Title */}
          <div>
            <h2 className="font-heading mb-4 text-3xl font-bold uppercase leading-tight md:text-4xl">
              FREQUENTLY
              <br />
              SWEETPIX
              <br />
              QUESTIONS
            </h2>
            <p className="body-md text-neutral-600">
              Do you have a question about us or your artwork?{" "}
              <Link href="/faq" className="text-black underline">
                Click Here
              </Link>
            </p>
          </div>

          {/* Right Side - Accordion */}
          <div className="divide-y divide-neutral-200 border-t border-neutral-200">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="body-md pr-4 font-medium">{faq.question}</span>
                  <CaretDown
                    size={20}
                    className={cn(
                      "shrink-0 transition-transform",
                      openId === faq.id && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openId === faq.id ? "max-h-96 pb-4" : "max-h-0"
                  )}
                >
                  <p className="body-sm text-neutral-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
