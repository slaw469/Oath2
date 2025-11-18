import React from 'react';

const TopRivals = () => {
  return (
    <section>
      <div className="mb-4">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white">Top rivals</h3>
        <p className="text-sm text-white/60">The people you battle with the most.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 @container sm:grid-cols-2">
        <div className="flex flex-col gap-4 rounded border border-surface bg-surface p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          <div className="flex items-center gap-3">
            <div
              className="size-12 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDypl8VV0t56nVGuE6QxiLWWmOlAKktUMUnVt_9o3UnQoIjmLAhbsUlBpkcwxx4pDdjyWrq9UEY2nfgosw9_6vsxvPuAiSHwjNTscZv0QCH3sa81KeUrbVSkizYO0L_ZlAbjTlIrmqhUQhixHVTub4ad_Y3T6L8RqJ0P6RoCuy5buMBB4-elYjm8sjwKYZjXDC-UH1yfyUmqJJTs9I13oye944BtSeiM5UrKgtVyL_m_VKjQB7zMp5B9VvMjbzD9mLVB9hcqftXfkb_')",
              }}
            ></div>
            <div>
              <p className="font-bold text-white">Alex</p>
              <p className="text-sm text-white/60">@alex_wins</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-white/60">Record</p>
              <p className="font-bold text-white">3 - 2</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <p>
              Net: <span className="font-bold text-success">+$40</span>
            </p>
            <p>
              Oaths: <span className="font-bold">5</span>
            </p>
            <p>
              Active: <span className="font-bold">2</span>
            </p>
          </div>
          <div className="h-1.5 w-full rounded-full bg-background-dark">
            <div
              className="h-full rounded-full bg-gradient-to-r from-success to-primary"
              style={{ width: '60%' }}
            ></div>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 flex-1 rounded-full bg-primary text-sm font-bold text-background-dark transition-opacity hover:opacity-90">
              Challenge
            </button>
            <button className="h-9 flex-1 rounded-full bg-white/10 text-sm font-medium text-white/80 transition-colors hover:bg-white/20">
              View history
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded border border-surface bg-surface p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          <div className="flex items-center gap-3">
            <div
              className="size-12 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHM72vQbLif62ksT85IH-d8IWVGgaO77QK9LVDgT52XsJTfpu2taeCWU26nOyRmfpc5sMTUlF-LeWYll-Qo-fB9GjP0YA4xDgAcYO-OMj9xu_rEL1RnC9jf8vS-hXpRokgNxgN015XZQNbdcg7h1jLA_ucvSHMOjGAoZMKT8AWyPF7wnKDqR7czYVA3QHkZqnH2D7ts_tUPjlP5yMj5NFoK3Rq1jlOZok69lo_DRvA9VhmPDTxTnoTr-0NOLl_8r69JIwuEDuJ-4fs')",
              }}
            ></div>
            <div>
              <p className="font-bold text-white">Jenna</p>
              <p className="text-sm text-white/60">@jenna_oath</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-white/60">Record</p>
              <p className="font-bold text-white">1 - 4</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <p>
              Net: <span className="font-bold text-danger">-$20</span>
            </p>
            <p>
              Oaths: <span className="font-bold">5</span>
            </p>
            <p>
              Active: <span className="font-bold">1</span>
            </p>
          </div>
          <div className="h-1.5 w-full rounded-full bg-background-dark">
            <div
              className="h-full rounded-full bg-gradient-to-r from-danger to-primary/50"
              style={{ width: '20%' }}
            ></div>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 flex-1 rounded-full bg-primary text-sm font-bold text-background-dark transition-opacity hover:opacity-90">
              Challenge
            </button>
            <button className="h-9 flex-1 rounded-full bg-white/10 text-sm font-medium text-white/80 transition-colors hover:bg-white/20">
              View history
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRivals;
