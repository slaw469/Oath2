import React from 'react';

const RandomOath = () => {
  return (
    <section className="w-full max-w-7xl">
      <div className="rounded border border-primary/20 bg-surface p-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white">Feeling adventurous?</h2>
            <p className="mt-2 text-white/60">Let Oath pick a challenge for you.</p>
            <div className="my-6 space-y-2 rounded bg-background-dark p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-sm uppercase text-white/60">Challenge</span>
                <span className="font-bold text-white">Daily journaling</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-sm uppercase text-white/60">Frequency</span>
                <span className="font-bold text-white">7-day streak</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase text-white/60">Stake</span>
                <span className="font-bold text-primary">$15</span>
              </div>
            </div>
            <button className="flex h-12 w-full items-center justify-center gap-3 rounded-full bg-primary px-8 text-lg font-bold text-background-dark transition-transform hover:scale-105 md:w-auto">
              <span>🎲</span>
              <span>Random Oath</span>
            </button>
            <p className="mt-3 text-xs text-white/60">
              Click to generate a random challenge. You can edit before starting.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded border border-dashed border-white/20 p-6 text-center">
            <p className="font-bold text-white">Your random Oath</p>
            <p className="text-2xl font-medium text-white">Daily journaling</p>
            <p className="text-lg text-white/80">
              7-day streak, <span className="font-bold text-primary">$15 stake</span>
            </p>
            <button className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-white/10 px-6 text-sm font-medium text-white transition-colors hover:bg-white/20">
              Make this an Oath
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomOath;
