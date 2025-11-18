import React from 'react';

const OathGenerator = () => {
  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-4 rounded border border-white/10 bg-surface p-6">
        <label className="font-bold text-white" htmlFor="oath-description">
          What are you trying to improve?
        </label>
        <textarea
          className="min-h-[120px] resize-none rounded border-white/10 bg-background-dark p-4 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary"
          id="oath-description"
          placeholder="I keep skipping the gym...
I want to read more books.
I spend too much money on takeout."
        ></textarea>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <button className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-primary text-background-dark text-sm font-bold leading-normal transition-opacity hover:opacity-90 sm:w-auto">
            Generate Oath
          </button>
          <p className="text-xs text-white/60">
            We’ll suggest a challenge, frequency, and suggested stake.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded border border-white/10 bg-surface p-6">
        <p className="font-bold text-white">Suggested Oath</p>
        <div className="flex flex-col gap-4 rounded border border-dashed border-white/20 p-4 text-center">
          <p className="text-2xl font-bold text-white">Gym 3x per week</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              Category: Fitness
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              Type: Habit
            </span>
            <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success">
              Risk: Medium
            </span>
          </div>
          <div className="my-2">
            <p className="text-sm uppercase tracking-wider text-white/60">Suggested Stake</p>
            <p className="text-4xl font-bold text-primary">$25</p>
          </div>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <button className="flex h-11 flex-1 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-background-dark transition-opacity hover:opacity-90">
              Make this an Oath
            </button>
            <button className="flex h-11 flex-1 items-center justify-center rounded-full border border-white/20 bg-transparent px-6 text-sm font-medium text-white transition-colors hover:bg-white/10">
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OathGenerator;
