import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { LogoStrip } from "@/components/home/LogoStrip";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyFde } from "@/components/home/WhyFde";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { WhyChoose } from "@/components/home/WhyChoose";
import { BookingSection } from "@/components/home/BookingSection";

export const metadata: Metadata = {
  title: "Build with Genie — Ship faster with AI",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoStrip />
      <ServicesPreview />
      <WhyFde />
      <IndustriesGrid />
      <ProcessTimeline />
      <WhyChoose />
      <BookingSection />
    </>
  );
}
