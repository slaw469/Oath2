import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OathGenerator from "@/components/OathGenerator";
import CuratedOaths from "@/components/CuratedOaths";
import RandomOath from "@/components/RandomOath";
import TrendingOaths from "@/components/TrendingOaths";

export default function IdeasPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center gap-16 p-4 py-12 sm:p-8 sm:py-16">
        <div className="w-full max-w-7xl">
          <section className="mb-16 text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white md:text-5xl">
              Don’t know what to bet on? Start here.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              Describe what you’re struggling with, and we’ll turn it into an
              Oath with real stakes.
            </p>
          </section>
          <OathGenerator />
        </div>
        <CuratedOaths />
        <RandomOath />
        <TrendingOaths />
      </main>
      <Footer />
    </div>
  );
}
