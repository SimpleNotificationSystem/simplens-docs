"use client"
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works";
import { MultiChannelSection } from "@/components/multi-channel";
import { DashboardSection } from "@/components/dashboard-section";
import { WhySimpleNSSection } from "@/components/why-simplens";
import { UseCasesSection } from "@/components/use-cases";
import { SelfHostingSection } from "@/components/self-hosting-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <SelfHostingSection />
      <HowItWorksSection />
      <MultiChannelSection />
      <DashboardSection />
      <WhySimpleNSSection />
      <UseCasesSection />
      <FAQSection />
      <Footer />
    </>
  );
}
