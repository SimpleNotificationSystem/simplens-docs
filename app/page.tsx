"use client"
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works";
import { MultiChannelSection } from "@/components/multi-channel";
import { DashboardSection } from "@/components/dashboard-section";
import { WhySimpleNSSection } from "@/components/why-simplens";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MultiChannelSection />
      <DashboardSection />
      <WhySimpleNSSection />
    </>
  );
}
