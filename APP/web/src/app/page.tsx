import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col font-sans">
      <Navbar />
      <Hero />
      <FeatureSection />
      <Comparison />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
