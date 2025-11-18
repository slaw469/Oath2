import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TodaysOaths from "@/components/TodaysOaths";
import MicroStatsBar from "@/components/MicroStatsBar";
import AllActiveOaths from "@/components/AllActiveOaths";
import TodayAtAGlance from "@/components/TodayAtAGlance";
import UpcomingDeadlines from "@/components/UpcomingDeadlines";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 justify-center p-4 sm:p-8">
        <div className="w-full max-w-7xl">
          {/* PageHeading */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-bold leading-tight tracking-tight text-white">
                Welcome back, Steven
              </p>
              <p className="text-sm font-normal leading-normal text-white/60">
                Here’s what’s at stake today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-white/80 sm:flex">
                <span className="material-symbols-outlined text-base">
                  calendar_today
                </span>
                <span>Tues, November 18</span>
              </div>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-background-dark text-sm font-bold leading-normal transition-opacity hover:opacity-90">
                <span className="truncate">Start New Oath</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left/Main Column */}
            <div className="flex flex-col gap-8 lg:col-span-2">
              <TodaysOaths />
              <MicroStatsBar />
              <AllActiveOaths />
            </div>
            {/* Right Column */}
            <div className="flex flex-col gap-8">
              <TodayAtAGlance />
              <UpcomingDeadlines />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
