import {
  CTASection,
  DecorateWallsSection,
  EffortlessSection,
  FAQSection,
  FeaturesBar,
  Footer,
  Header,
  HeroSection,
  HowItWorksSection,
  LovedBySection,
  TestimonialsSection,
} from "../components";

export const LandingPage = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesBar />
      <DecorateWallsSection />
      <EffortlessSection />
      <HowItWorksSection />
      <LovedBySection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  );
};
