import React from 'react';

const TodaysOaths = () => {
  return (
    <section>
      <div className="mb-4">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white">Today’s Oaths</h3>
        <p className="text-sm text-white/60">These Oaths have check-ins or deadlines today.</p>
      </div>
      <div className="flex flex-col gap-4">
        {/* Oath Card 1 (Urgent) */}
        <div className="flex flex-col gap-4 rounded border border-danger/50 bg-surface p-5 shadow-lg shadow-danger/10 transition-all hover:shadow-danger/20">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-bold text-white">Morning Run - 5km</p>
              <p className="text-sm text-white/60">Fitness</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60">POT</p>
              <p className="text-2xl font-bold text-primary">$50</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkgrxPY2rMZJh4uTdEKkn9qtKQfunneLgfZrXqZEcFgVP-Hl-G1NRgyoO0Mxj0GiMqIoe-P7uV-705o_kduwSHKCJkom3FhqM_PDfBaXSSOBh1dN0vWkI0A5_vZThY25kpUWLlnlON5WVFkXwWEGBSFprrkEkq3VNh8JjswF2d4dtLTWicVaJZM7uzHICw_44wHygmQ2wUyu3Rm9zCRaYs6drDmVYv2ymQIe_QgOoPY0FMzJ74T0I9KZ8A_0pGZdrMQtcwguUoJXoM')" }}></div>
                <span className="text-sm font-medium text-white">You</span>
              </div>
              <span className="text-sm text-white/40">vs</span>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDypl8VV0t56nVGuE6QxiLWWmOlAKktUMUnVt_9o3UnQoIjmLAhbsUlBpkcwxx4pDdjyWrq9UEY2nfgosw9_6vsxvPuAiSHwjNTscZv0QCH3sa81KeUrbVSkizYO0L_ZlAbjTlIrmqhUQhixHVTub4ad_Y3T6L8RqJ0P6RoCuy5buMBB4-elYjm8sjwKYZjXDC-UH1yfyUmqJJTs9I13oye944BtSeiM5UrKgtVyL_m_VKjQB7zMp5B9VvMjbzD9mLVB9hcqftXfkb_')" }}></div>
                <span className="text-sm font-medium text-white">Alex</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-success/20 px-2.5 py-1 text-xs font-medium text-success">Your status: Safe</div>
              <div className="rounded-full bg-danger/20 px-2.5 py-1 text-xs font-medium text-danger">Their status: At Risk</div>
            </div>
          </div>
          <div className="h-px w-full bg-white/10"></div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs text-white/60">Deadline</p>
                <p className="font-medium text-white">Today at 9:00 AM</p>
              </div>
              <div className="text-center text-danger">
                <p className="text-xs">Time Remaining</p>
                <p className="font-medium">32m 10s</p>
              </div>
              <div className="hidden text-center sm:block">
                <p className="text-xs text-white/60">Streak</p>
                <p className="font-medium text-white">7 days</p>
              </div>
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <button className="flex h-10 flex-1 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/20">View Submissions</button>
              <button className="flex h-10 flex-1 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-background-dark transition-opacity hover:opacity-90">Upload Proof</button>
            </div>
          </div>
        </div>
        {/* Oath Card 2 */}
        <div className="flex flex-col gap-4 rounded border border-surface bg-surface p-5 transition-all hover:border-white/20">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-bold text-white">Daily Meditation - 15 mins</p>
              <p className="text-sm text-white/60">Mindfulness</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60">POT</p>
              <p className="text-2xl font-bold text-primary">$20</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBm1irWc2tEX-m1gSTFIaHEMS71kFb3G15BpNAgUiM2tD8nABj45PUbZlKpHmUyaTZLNZBjvwn0U92DcpY4AC9BuSCcdDeqIToYIeh4zeZrLkUr3tXmONrK04D9th7BnEe_1MipRPeq1uP9j9981D2qLTZSye9r2EQ0em0Za1qHgjEEEN2_--GAoF_UmhiaSgaBrhPZO3DLme2BvgWr4xllvb-9HZSG88k5kj_h73Ax2dSjYvE0uttjwAuvVZ47vUSIobiZZoFfLOXC')" }}></div>
                <span className="text-sm font-medium text-white">You</span>
              </div>
              <span className="text-sm text-white/40">vs</span>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHM72vQbLif62ksT85IH-d8IWVGgaO77QK9LVDgT52XsJTfpu2taeCWU26nOyRmfpc5sMTUlF-LeWYll-Qo-fB9GjP0YA4xDgAcYO-OMj9xu_rEL1RnC9jf8vS-hXpRokgNxgN015XZQNbdcg7h1jLA_ucvSHMOjGAoZMKT8AWyPF7wnKDqR7czYVA3QHkZqnH2D7ts_tUPjlP5yMj5NFoK3Rq1jlOZok69lo_DRvA9VhmPDTxTnoTr-0NOLl_8r69JIwuEDuJ-4fs')" }}></div>
                <span className="text-sm font-medium text-white">Jenna</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-success/20 px-2.5 py-1 text-xs font-medium text-success">Your status: Safe</div>
              <div className="rounded-full bg-success/20 px-2.5 py-1 text-xs font-medium text-success">Their status: Safe</div>
            </div>
          </div>
          <div className="h-px w-full bg-white/10"></div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs text-white/60">Deadline</p>
                <p className="font-medium text-white">Today at 11:59 PM</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/60">Time Remaining</p>
                <p className="font-medium text-white">14h 21m</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-10 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/20">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodaysOaths;
