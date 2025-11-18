import React from 'react';

const FriendsStats = () => {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="flex items-center gap-4 rounded border border-surface bg-surface p-4 transition-transform hover:-translate-y-1">
        <span className="material-symbols-outlined text-3xl text-primary/80">group</span>
        <div>
          <p className="text-sm text-white/60">Total friends</p>
          <p className="text-2xl font-bold text-white">12</p>
        </div>
      </div>
      <div className="flex items-center gap-4 rounded border border-surface bg-surface p-4 transition-transform hover:-translate-y-1">
        <span className="material-symbols-outlined text-3xl text-primary/80">swords</span>
        <div>
          <p className="text-sm text-white/60">Active rivals</p>
          <p className="text-2xl font-bold text-white">4</p>
        </div>
      </div>
      <div className="flex items-center gap-4 rounded border border-surface bg-surface p-4 transition-transform hover:-translate-y-1">
        <span className="material-symbols-outlined text-3xl text-success">trending_up</span>
        <div>
          <p className="text-sm text-white/60">Net vs friends</p>
          <p className="text-2xl font-bold text-success">+$85</p>
        </div>
      </div>
      <div className="flex items-center gap-4 rounded border border-surface bg-surface p-4 transition-transform hover:-translate-y-1">
        <span className="material-symbols-outlined text-3xl text-primary/80">local_fire_department</span>
        <div>
          <p className="text-sm text-white/60">Most active</p>
          <p className="text-xl font-bold text-white">Alex • 5 Oaths</p>
        </div>
      </div>
    </div>
  );
};

export default FriendsStats;
