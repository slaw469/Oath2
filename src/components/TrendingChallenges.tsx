import React from 'react';

const TrendingChallenges = () => {
  return (
    <section>
      <div className="mb-4">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white">
          Trending Challenges
        </h3>
        <p className="text-sm text-white/60">
          Viral, competitive, and high-stakes Oaths rising across the community.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="group relative overflow-hidden rounded border border-surface bg-surface p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          <div className="absolute right-4 top-4 rounded-full bg-danger/80 px-2 py-1 text-xs font-bold text-white shadow-md">
            🔥 Trending now
          </div>
          <div className="flex h-full flex-col">
            <p className="text-lg font-bold text-white">1000 Pull-ups Streak</p>
            <p className="text-sm text-white/60">Prove your endurance daily.</p>
            <div className="my-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
                Ultra difficulty
              </span>
            </div>
            <div className="mt-auto">
              <p className="text-sm text-white/80">
                Avg stake: <span className="font-bold text-primary">$75</span>
              </p>
              <button className="mt-3 flex h-10 w-full items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-background-dark">
                Start this Oath
              </button>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded border border-surface bg-surface p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          <div className="flex h-full flex-col">
            <p className="text-lg font-bold text-white">Daily LeetCode</p>
            <p className="text-sm text-white/60">One problem, every day.</p>
            <div className="my-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
                Discipline
              </span>
            </div>
            <div className="mt-auto">
              <p className="text-sm text-white/80">
                Avg stake: <span className="font-bold text-primary">$20</span>
              </p>
              <button className="mt-3 flex h-10 w-full items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-background-dark">
                Start this Oath
              </button>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded border border-surface bg-surface p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          <div className="absolute right-4 top-4 rounded-full bg-danger/80 px-2 py-1 text-xs font-bold text-white shadow-md">
            🔥 Trending now
          </div>
          <div className="flex h-full flex-col">
            <p className="text-lg font-bold text-white">No Alcohol Challenge</p>
            <p className="text-sm text-white/60">Commit to a sober month.</p>
            <div className="my-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
                Health
              </span>
            </div>
            <div className="mt-auto">
              <p className="text-sm text-white/80">
                Avg stake: <span className="font-bold text-primary">$100</span>
              </p>
              <button className="mt-3 flex h-10 w-full items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-background-dark">
                Start this Oath
              </button>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded border border-surface bg-surface p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          <div className="flex h-full flex-col">
            <p className="text-lg font-bold text-white">Read 10 Pages Daily</p>
            <p className="text-sm text-white/60">Build a consistent reading habit.</p>
            <div className="my-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
                Knowledge
              </span>
            </div>
            <div className="mt-auto">
              <p className="text-sm text-white/80">
                Avg stake: <span className="font-bold text-primary">$15</span>
              </p>
              <button className="mt-3 flex h-10 w-full items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-background-dark">
                Start this Oath
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingChallenges;
