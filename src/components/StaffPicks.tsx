import React from 'react';

const StaffPicks = () => {
  return (
    <section>
      <div className="mb-4">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white">Staff Picks</h3>
        <p className="text-sm text-white/60">Proven to boost discipline and competition.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col rounded border border-surface bg-surface p-5 transition-transform hover:-translate-y-1 hover:border-white/20">
          <div className="mb-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary self-start">
            Productivity
          </div>
          <p className="text-lg font-bold text-white">Daily LeetCode</p>
          <p className="mb-4 text-sm text-white/60">
            Sharpen your coding skills every single day. A must for any aspiring engineer.
          </p>
          <div className="mt-auto">
            <p className="text-sm text-white/80">
              Suggested Stake: <span className="font-bold text-primary">$20</span>
            </p>
            <button className="mt-3 flex h-10 w-full items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/80 transition-colors hover:bg-primary hover:text-background-dark">
              Start Oath
            </button>
          </div>
        </div>
        <div className="flex flex-col rounded border border-surface bg-surface p-5 transition-transform hover:-translate-y-1 hover:border-white/20">
          <div className="mb-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary self-start">
            Fitness
          </div>
          <p className="text-lg font-bold text-white">Gym 4x/week</p>
          <p className="mb-4 text-sm text-white/60">
            Build consistency and strength. The foundation of any good fitness routine.
          </p>
          <div className="mt-auto">
            <p className="text-sm text-white/80">
              Suggested Stake: <span className="font-bold text-primary">$30</span>
            </p>
            <button className="mt-3 flex h-10 w-full items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/80 transition-colors hover:bg-primary hover:text-background-dark">
              Start Oath
            </button>
          </div>
        </div>
        <div className="flex flex-col rounded border border-surface bg-surface p-5 transition-transform hover:-translate-y-1 hover:border-white/20">
          <div className="mb-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary self-start">
            Mindfulness
          </div>
          <p className="text-lg font-bold text-white">Journaling 10 mins/day</p>
          <p className="mb-4 text-sm text-white/60">
            Clear your mind, set your intentions, and reflect on your progress. Highly effective.
          </p>
          <div className="mt-auto">
            <p className="text-sm text-white/80">
              Suggested Stake: <span className="font-bold text-primary">$10</span>
            </p>
            <button className="mt-3 flex h-10 w-full items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/80 transition-colors hover:bg-primary hover:text-background-dark">
              Start Oath
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffPicks;
