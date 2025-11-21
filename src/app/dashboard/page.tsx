import TodaysOaths from "@/components/TodaysOaths";
import TodayAtAGlance from "@/components/TodayAtAGlance";
import UpcomingDeadlines from "@/components/UpcomingDeadlines";
import AllActiveOaths from "@/components/AllActiveOaths";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-dark">
      <main className="flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, Steven</h1>
              <p className="mt-2 text-sm text-white/60">Here's what's at stake today.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Tues, November 18</span>
              </div>
              <Link href="/create-oath" className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-black transition-all hover:bg-primary/90">
                Start New Oath
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <TodaysOaths />
              <AllActiveOaths />
            </div>
            <div className="space-y-6">
              <TodayAtAGlance />
              <UpcomingDeadlines />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
