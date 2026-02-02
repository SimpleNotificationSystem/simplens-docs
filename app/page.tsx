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
import { LightRays } from "@/components/ui/light-rays";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Global Light Rays Background */}
      <LightRays className="fixed inset-0 z-0 opacity-30 pointer-events-none" />

      {/* Page Content */}
      <div className="relative z-10">
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
      </div>
    </div>
  );
}
