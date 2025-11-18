import React from 'react';

const RandomOathGenerator = () => {
  return (
    <section
      className="rounded-lg border border-surface bg-surface p-6 shadow-lg shadow-primary/5"
      style={{
        boxShadow: '0 0 25px rgba(248, 204, 0, 0.05), inset 0 0 15px rgba(248, 204, 0, 0.05)',
      }}
    >
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-white">
            Feeling bold?
          </h3>
          <p className="text-sm text-white/60">Spin the wheel and get a random challenge.</p>
          <div className="my-6 flex justify-center gap-4 text-center md:justify-start">
            <div className="flex w-24 flex-col items-center rounded bg-background-dark p-3">
              <span className="text-xs text-white/60">TYPE</span>
              <span className="text-lg font-bold text-primary">Fitness</span>
            </div>
            <div className="flex w-24 flex-col items-center rounded bg-background-dark p-3">
              <span className="text-xs text-white/60">FREQUENCY</span>
              <span className="text-lg font-bold text-primary">Daily</span>
            </div>
            <div className="flex w-24 flex-col items-center rounded bg-background-dark p-3">
              <span className="text-xs text-white/60">STAKE</span>
              <span className="text-lg font-bold text-primary">$50</span>
            </div>
          </div>
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-background-dark transition-opacity hover:opacity-90 md:w-auto">
            <span className="text-2xl">🎲</span>
            <span>Generate Random Oath</span>
          </button>
        </div>
        <div className="rounded bg-background-dark p-4">
          <p className="font-bold text-white">Generated: Run 5km Daily</p>
          <p className="text-sm text-white/60">Suggested Stake: $50</p>
          <button className="mt-4 flex h-10 w-full items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white/80 transition-colors hover:bg-white/20">
            Make this an Oath
          </button>
        </div>
      </div>
    </section>
  );
};

export default RandomOathGenerator;
