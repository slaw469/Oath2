import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FriendsStats from "@/components/FriendsStats";
import TopRivals from "@/components/TopRivals";
import AllFriends from "@/components/AllFriends";
import PendingRequests from "@/components/PendingRequests";
import SuggestedConnections from "@/components/SuggestedConnections";

export default function FriendsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 justify-center p-4 sm:p-8">
        <div className="w-full max-w-7xl">
          <div className="mb-6 rounded-lg bg-surface/50 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-white">
                  Friends & Rivals
                </h1>
                <p className="text-sm font-normal leading-normal text-white/60">
                  See your circle, your record, and who to challenge next.
                </p>
              </div>
              <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                    search
                  </span>
                  <input
                    className="h-10 w-full rounded-full border-none bg-background-dark/50 pl-10 pr-4 text-sm text-white/80 placeholder-white/50 focus:ring-2 focus:ring-primary/50"
                    placeholder="Search friends..."
                    type="search"
                  />
                </div>
                <button className="flex h-10 w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-6 text-sm font-bold leading-normal text-background-dark transition-opacity hover:opacity-90 sm:w-auto">
                  <span className="truncate">Add friend</span>
                </button>
              </div>
            </div>
          </div>
          <FriendsStats />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex flex-col gap-8 lg:col-span-2">
              <TopRivals />
              <AllFriends />
            </div>
            <div className="flex flex-col gap-8">
              <PendingRequests />
              <SuggestedConnections />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
