import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveFeed from "@/components/LiveFeed";
import ActiveBattles from "@/components/ActiveBattles";
import TrendingChallenges from "@/components/TrendingChallenges";
import RandomOathGenerator from "@/components/RandomOathGenerator";
import StaffPicks from "@/components/StaffPicks";

export default function ArenaPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 justify-center p-4 sm:p-8">
        <div className="w-full max-w-7xl">
          <div
            className="mb-6 rounded-lg bg-surface/50 p-6"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(255, 255, 255, 0.02) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.02) 75%, transparent 75%, transparent)",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-4xl font-bold leading-tight tracking-tight text-white">The Arena</p>
                <p className="text-sm font-normal leading-normal text-white/60">
                  Live challenges, rivalries, wins, losses — all happening right now.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-white/10 text-sm font-medium text-white/80 transition-colors hover:bg-white/20">
                  <span className="truncate">Challenge a friend</span>
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary text-background-dark text-base font-bold leading-normal transition-opacity hover:opacity-90">
                  <span className="truncate">Start New Oath</span>
                </button>
              </div>
            </div>
          </div>
          <LiveFeed />
          <div className="flex flex-col gap-12">
            <ActiveBattles />
            <TrendingChallenges />
            <RandomOathGenerator />
            <StaffPicks />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
