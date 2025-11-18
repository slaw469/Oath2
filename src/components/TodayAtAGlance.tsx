import React from 'react';

const TodayAtAGlance = () => {
  return (
    <section>
      <div className="rounded border border-surface bg-surface p-6">
        <h3 className="mb-4 text-lg font-bold leading-tight tracking-tight text-white">Today at a glance</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-1">
            <p className="text-sm font-medium leading-normal text-white/80">Active Oaths Today</p>
            <p className="text-3xl font-bold leading-tight tracking-tight text-white">3</p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-1">
            <p className="text-sm font-medium leading-normal text-white/80">Total at Stake</p>
            <p className="text-3xl font-bold leading-tight tracking-tight text-white">$145</p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-1">
            <p className="text-sm font-medium leading-normal text-white/80">Next Deadline</p>
            <p className="text-3xl font-bold leading-tight tracking-tight text-primary">In 32m</p>
          </div>
        </div>
        <p className="mt-4 text-xs font-normal leading-normal text-white/60">
          Auto payouts trigger at your deadline if proof is missing.
        </p>
      </div>
    </section>
  );
};

export default TodayAtAGlance;
