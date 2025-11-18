import React from 'react';

const HistoryContent = () => {
  return (
    <div>
      <div className="mb-6 border-b border-white/10">
        <div className="-mb-px flex items-center gap-6 text-sm">
          <button className="border-b-2 border-primary pb-3 font-bold text-primary">Overview</button>
          <button className="border-b-2 border-transparent pb-3 text-white/60 hover:text-white">By Oath</button>
          <button className="border-b-2 border-transparent pb-3 text-white/60 hover:text-white">By Friend</button>
          <button className="border-b-2 border-transparent pb-3 text-white/60 hover:text-white">Receipts</button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4 rounded border border-surface bg-surface p-4 transition-shadow hover:shadow-lg hover:shadow-primary/10">
              <div className="flex flex-1 items-center gap-4">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-success">WIN</p>
                </div>
                <div className="w-px self-stretch bg-white/10"></div>
                <div>
                  <p className="font-bold text-white">1 LeetCode per day</p>
                  <p className="text-xs text-white/60">vs Alex • Oct 28 - Nov 3</p>
                </div>
              </div>
              <div className="hidden text-right md:block">
                <p className="text-2xl font-bold text-success">+$50</p>
                <p className="text-xs text-white/60">Stake: $50</p>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-white/80">Nov 3</p>
                  <p className="text-xs text-white/60">Settled</p>
                </div>
                <button className="flex h-10 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/20">
                  View
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 rounded border border-surface bg-surface p-4 transition-shadow hover:shadow-lg hover:shadow-primary/10">
              <div className="flex flex-1 items-center gap-4">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-danger">LOSS</p>
                </div>
                <div className="w-px self-stretch bg-white/10"></div>
                <div>
                  <p className="font-bold text-white">No sugar after 8pm</p>
                  <p className="text-xs text-white/60">vs Marcus • Oct 20 - Oct 26</p>
                </div>
              </div>
              <div className="hidden text-right md:block">
                <p className="text-2xl font-bold text-danger">-$40</p>
                <p className="text-xs text-white/60">Stake: $40</p>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-white/80">Oct 26</p>
                  <p className="text-xs text-white/60">Settled</p>
                </div>
                <button className="flex h-10 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/20">
                  View
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 rounded border border-surface bg-surface p-4 transition-shadow hover:shadow-lg hover:shadow-primary/10">
              <div className="flex flex-1 items-center gap-4">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-success">WIN</p>
                </div>
                <div className="w-px self-stretch bg-white/10"></div>
                <div>
                  <p className="font-bold text-white">Code for 1 hour</p>
                  <p className="text-xs text-white/60">vs Alex • Oct 15 - Oct 21</p>
                </div>
              </div>
              <div className="hidden text-right md:block">
                <p className="text-2xl font-bold text-success">+$25</p>
                <p className="text-xs text-white/60">Stake: $25</p>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-white/80">Oct 21</p>
                  <p className="text-xs text-white/60">Settled</p>
                </div>
                <button className="flex h-10 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/20">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="rounded border border-surface bg-surface p-6">
            <h3 className="mb-4 text-lg font-bold leading-tight tracking-tight text-white">
              Performance over time
            </h3>
            <div className="h-48 w-full">{/* Placeholder for chart */}</div>
            <div className="mt-4 flex justify-between text-xs text-white/60">
              <span>Oct 1</span>
              <span>Nov 1</span>
              <span>Dec 1</span>
            </div>
            <div className="mt-4 border-t border-white/10 pt-4 text-sm">
              <p className="text-success">+ $80 on Nov 2 (Best Day)</p>
              <p className="text-danger">- $40 on Oct 20 (Worst Day)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryContent;
