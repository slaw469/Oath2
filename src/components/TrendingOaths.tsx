import React from 'react';

const TrendingOaths = () => {
  return (
    <section className="w-full max-w-7xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white">Trending Oaths in the Arena</h2>
        <p className="mt-2 text-white/60">See what other people are betting their discipline on.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="flex flex-col justify-between rounded border border-white/10 bg-surface p-5">
          <div>
            <p className="font-bold text-white">No food delivery for 7 days</p>
            <p className="my-2 text-xs text-white/60">Avg Stake: $35 • Category: Money</p>
            <div className="flex items-center gap-2">
              <div className="relative h-2 flex-1 rounded-full bg-background-dark">
                <div className="absolute left-0 top-0 h-2 rounded-full bg-success" style={{ width: '78%' }}></div>
              </div>
              <span className="text-xs font-medium text-success">78%</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button className="rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/40">
              Start this Oath
            </button>
            <div className="flex items-center gap-1.5">
              <div className="size-2 animate-pulse rounded-full bg-success"></div>
              <p className="text-xs text-white/60">12 active</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded border border-white/10 bg-surface p-5">
          <div>
            <p className="font-bold text-white">Daily Cold Shower</p>
            <p className="my-2 text-xs text-white/60">Avg Stake: $10 • Category: Health</p>
            <div className="flex items-center gap-2">
              <div className="relative h-2 flex-1 rounded-full bg-background-dark">
                <div className="absolute left-0 top-0 h-2 rounded-full bg-success" style={{ width: '62%' }}></div>
              </div>
              <span className="text-xs font-medium text-success">62%</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button className="rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/40">
              Start this Oath
            </button>
            <div className="flex items-center gap-1.5">
              <div className="size-2 animate-pulse rounded-full bg-success"></div>
              <p className="text-xs text-white/60">28 active</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded border border-white/10 bg-surface p-5">
          <div>
            <p className="font-bold text-white">Meditate 10 mins daily</p>
            <p className="my-2 text-xs text-white/60">Avg Stake: $20 • Category: Mindfulness</p>
            <div className="flex items-center gap-2">
              <div className="relative h-2 flex-1 rounded-full bg-background-dark">
                <div className="absolute left-0 top-0 h-2 rounded-full bg-danger" style={{ width: '45%' }}></div>
              </div>
              <span className="text-xs font-medium text-danger">45%</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button className="rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/40">
              Start this Oath
            </button>
            <div className="flex items-center gap-1.5">
              <div className="size-2 animate-pulse rounded-full bg-success"></div>
              <p className="text-xs text-white/60">41 active</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded border border-white/10 bg-surface p-5">
          <div>
            <p className="font-bold text-white">Drink 2L of water</p>
            <p className="my-2 text-xs text-white/60">Avg Stake: $5 • Category: Health</p>
            <div className="flex items-center gap-2">
              <div className="relative h-2 flex-1 rounded-full bg-background-dark">
                <div className="absolute left-0 top-0 h-2 rounded-full bg-success" style={{ width: '91%' }}></div>
              </div>
              <span className="text-xs font-medium text-success">91%</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button className="rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/40">
              Start this Oath
            </button>
            <div className="flex items-center gap-1.5">
              <div className="size-2 animate-pulse rounded-full bg-success"></div>
              <p className="text-xs text-white/60">55 active</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingOaths;
