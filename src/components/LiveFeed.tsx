import React from 'react';

const LiveFeed = () => {
  return (
    <div className="mb-10 w-full overflow-hidden bg-black py-3 shadow-lg shadow-primary/20" style={{ boxShadow: '0 0 15px rgba(248, 204, 0, 0.2), 0 0 5px rgba(248, 204, 0, 0.1)' }}>
      <div className="flex animate-scroll whitespace-nowrap">
        <div className="flex min-w-full shrink-0 items-center justify-around">
          <div className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
            <span>🔥</span>
            <p>
              Alex claimed <span className="font-bold text-primary">$50</span> from Steven for missing his
              check-in.
            </p>
          </div>
          <div className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
            <span>👀</span>
            <p>Marcus vs Leah — new Oath started: 'Run 5K daily.'</p>
          </div>
          <div className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
            <span>💀</span>
            <p>Jason missed deadline — auto payout triggered.</p>
          </div>
          <div className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
            <span>⚔️</span>
            <p>
              New trending challenge: '1000 pull-ups streak —{' '}
              <span className="font-bold text-primary">$100 pot</span>.'
            </p>
          </div>
          <div className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
            <span>🧠</span>
            <p>Will submitted proof: 'Daily LeetCode.'</p>
          </div>
        </div>
        <div aria-hidden="true" className="flex min-w-full shrink-0 items-center justify-around">
          <div className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
            <span>🔥</span>
            <p>
              Alex claimed <span className="font-bold text-primary">$50</span> from Steven for missing his
              check-in.
            </p>
          </div>
          <div className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
            <span>👀</span>
            <p>Marcus vs Leah — new Oath started: 'Run 5K daily.'</p>
          </div>
          <div className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
            <span>💀</span>
            <p>Jason missed deadline — auto payout triggered.</p>
          </div>
          <div className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
            <span>⚔️</span>
            <p>
              New trending challenge: '1000 pull-ups streak —{' '}
              <span className="font-bold text-primary">$100 pot</span>.'
            </p>
          </div>
          <div className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
            <span>🧠</span>
            <p>Will submitted proof: 'Daily LeetCode.'</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
