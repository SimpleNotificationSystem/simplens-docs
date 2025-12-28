"use client"
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
    </>
  );
}
