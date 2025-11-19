import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <Hero />
        <HowItWorks />
      </main>
    </div>
  );
}
