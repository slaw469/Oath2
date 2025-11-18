import React from 'react';

const CuratedOaths = () => {
  return (
    <section className="w-full max-w-7xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white">Curated Oaths by Category</h2>
        <p className="mt-2 text-white/60">Choose a category and start a ready-made Oath in one click.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="group flex flex-col gap-4 rounded border border-white/10 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <h3 className="text-xl font-bold text-white">Self-Discipline</h3>
          </div>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center justify-between gap-2 rounded bg-background-dark p-3">
              <p className="text-sm text-white/90">
                Wake up at 6 AM daily — <span className="font-bold text-primary">$20 stake</span>
              </p>
              <button className="flex-shrink-0 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/40">
                Start
              </button>
            </li>
            <li className="flex items-center justify-between gap-2 rounded bg-background-dark p-3">
              <p className="text-sm text-white/90">
                No social media after 10 PM — <span className="font-bold text-primary">$15 stake</span>
              </p>
              <button className="flex-shrink-0 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/40">
                Start
              </button>
            </li>
          </ul>
        </div>
        <div className="group flex flex-col gap-4 rounded border border-white/10 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💪</span>
            <h3 className="text-xl font-bold text-white">Fitness</h3>
          </div>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center justify-between gap-2 rounded bg-background-dark p-3">
              <p className="text-sm text-white/90">
                Gym 4x per week — <span className="font-bold text-primary">$50 stake</span>
              </p>
              <button className="flex-shrink-0 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/40">
                Start
              </button>
            </li>
            <li className="flex items-center justify-between gap-2 rounded bg-background-dark p-3">
              <p className="text-sm text-white/90">
                Run 10km total this week — <span className="font-bold text-primary">$30 stake</span>
              </p>
              <button className="flex-shrink-0 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/40">
                Start
              </button>
            </li>
          </ul>
        </div>
        <div className="group flex flex-col gap-4 rounded border border-white/10 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧠</span>
            <h3 className="text-xl font-bold text-white">Learning</h3>
          </div>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center justify-between gap-2 rounded bg-background-dark p-3">
              <p className="text-sm text-white/90">
                Read 20 pages a day — <span className="font-bold text-primary">$25 stake</span>
              </p>
              <button className="flex-shrink-0 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/40">
                Start
              </button>
            </li>
            <li className="flex items-center justify-between gap-2 rounded bg-background-dark p-3">
              <p className="text-sm text-white/90">
                Code for 1 hour daily — <span className="font-bold text-primary">$40 stake</span>
              </p>
              <button className="flex-shrink-0 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/40">
                Start
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CuratedOaths;
