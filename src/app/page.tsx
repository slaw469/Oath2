import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyOathWorks from "@/components/WhyOathWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WhyOathWorks />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
