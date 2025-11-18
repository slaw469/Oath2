import React from 'react';

const HistoryStats = () => {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
      <div className="flex flex-col gap-2 rounded border border-surface bg-surface p-4 transition-transform hover:-translate-y-1">
        <p className="text-sm text-white/60">Net Gain</p>
        <p className="text-3xl font-bold text-success">+$150</p>
      </div>
      <div className="flex flex-col gap-2 rounded border border-surface bg-surface p-4 transition-transform hover:-translate-y-1">
        <p className="text-sm text-white/60">Win Rate</p>
        <p className="text-3xl font-bold text-primary">68%</p>
      </div>
      <div className="flex flex-col gap-2 rounded border border-surface bg-surface p-4 transition-transform hover:-translate-y-1">
        <p className="text-sm text-white/60">Total Won</p>
        <p className="text-3xl font-bold text-success">$240</p>
      </div>
      <div className="flex flex-col gap-2 rounded border border-surface bg-surface p-4 transition-transform hover:-translate-y-1">
        <p className="text-sm text-white/60">Total Paid Out</p>
        <p className="text-3xl font-bold text-danger">$90</p>
      </div>
    </div>
  );
};

export default HistoryStats;
