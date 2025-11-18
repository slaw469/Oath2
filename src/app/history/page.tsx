import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HistoryStats from "@/components/HistoryStats";
import HistoryContent from "@/components/HistoryContent";

export default function HistoryPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 justify-center p-4 sm:p-8">
        <div className="w-full max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-bold leading-tight tracking-tight text-white">History</p>
              <p className="text-sm font-normal leading-normal text-white/60">
                Your wins, losses, and Oaths so far.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-full bg-surface p-1 text-sm text-white/80">
                <button className="rounded-full px-3 py-1 text-xs font-medium text-white/60 hover:bg-white/10">
                  Last 7 days
                </button>
                <button className="rounded-full px-3 py-1 text-xs font-medium text-white/60 hover:bg-white/10">
                  Last 30 days
                </button>
                <button className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                  All time
                </button>
                <button className="rounded-full p-1.5 hover:bg-white/10">
                  <span className="material-symbols-outlined text-base">calendar_today</span>
                </button>
              </div>
              <button className="flex h-9 items-center gap-2 rounded-full bg-surface px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/20">
                <span>All results</span>
                <span className="material-symbols-outlined text-base">expand_more</span>
              </button>
            </div>
          </div>
          <HistoryStats />
          <HistoryContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
