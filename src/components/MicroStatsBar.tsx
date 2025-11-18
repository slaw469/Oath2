import React from 'react';

const MicroStatsBar = () => {
  return (
    <section>
      <div className="flex flex-wrap items-center gap-2 rounded bg-surface p-3">
        <a className="flex-grow rounded-full bg-background-dark px-3 py-1.5 text-center text-xs text-white/80 transition-colors hover:bg-primary/20 hover:text-primary sm:flex-grow-0" href="#">
          Win rate: <span className="font-bold">68%</span>
        </a>
        <a className="flex-grow rounded-full bg-background-dark px-3 py-1.5 text-center text-xs text-white/80 transition-colors hover:bg-primary/20 hover:text-primary sm:flex-grow-0" href="#">
          Total won: <span className="font-bold text-success">$240</span>
        </a>
        <a className="flex-grow rounded-full bg-background-dark px-3 py-1.5 text-center text-xs text-white/80 transition-colors hover:bg-primary/20 hover:text-primary sm:flex-grow-0" href="#">
          Total paid out: <span className="font-bold text-danger">$90</span>
        </a>
        <a className="flex-grow rounded-full bg-background-dark px-3 py-1.5 text-center text-xs text-white/80 transition-colors hover:bg-primary/20 hover:text-primary sm:flex-grow-0" href="#">
          Longest streak: <span className="font-bold">12 days</span>
        </a>
      </div>
    </section>
  );
};

export default MicroStatsBar;
