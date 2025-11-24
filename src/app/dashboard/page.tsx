import TodaysOaths from "@/components/TodaysOaths";
import TodayAtAGlance from "@/components/TodayAtAGlance";
import UpcomingDeadlines from "@/components/UpcomingDeadlines";
import AllActiveOaths from "@/components/AllActiveOaths";
import OathInvitations from "@/components/OathInvitations";
import PendingOaths from "@/components/PendingOaths";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-dark">
      <main className="flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <DashboardHeader />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <OathInvitations />
              <TodaysOaths />
              <AllActiveOaths />
            </div>
            <div className="space-y-6">
              <TodayAtAGlance />
              <PendingOaths />
              <UpcomingDeadlines />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
