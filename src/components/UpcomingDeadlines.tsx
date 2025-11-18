import React from 'react';

const UpcomingDeadlines = () => {
  return (
    <section>
      <div className="rounded border border-surface bg-surface p-6">
        <h3 className="mb-4 text-lg font-bold leading-tight tracking-tight text-white">Upcoming deadlines</h3>
        <div className="relative flex flex-col gap-6 pl-5">
          {/* Timeline line */}
          <div className="absolute bottom-4 left-1.5 top-4 w-0.5 bg-white/10"></div>
          {/* Timeline Item 1 */}
          <div className="relative flex items-start gap-4">
            <div className="absolute -left-3.5 top-1.5 z-10 flex size-3 items-center justify-center rounded-full bg-danger ring-4 ring-surface"></div>
            <div>
              <p className="font-bold text-white">Morning Run - 5km</p>
              <p className="text-sm text-white/60">
                vs Alex - <span className="font-semibold text-primary">$50</span>
              </p>
            </div>
            <div className="ml-auto whitespace-nowrap rounded-full bg-danger/20 px-2 py-0.5 text-xs font-medium text-danger">
              32m left
            </div>
          </div>
          {/* Timeline Item 2 */}
          <div className="relative flex items-start gap-4">
            <div className="absolute -left-3.5 top-1.5 z-10 flex size-3 items-center justify-center rounded-full bg-primary ring-4 ring-surface"></div>
            <div>
              <p className="font-bold text-white">Read 20 pages</p>
              <p className="text-sm text-white/60">
                vs Sam - <span className="font-semibold text-primary">$25</span>
              </p>
            </div>
            <div className="ml-auto whitespace-nowrap rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
              2h 14m left
            </div>
          </div>
          {/* Timeline Item 3 */}
          <div className="relative flex items-start gap-4">
            <div className="absolute -left-3.5 top-1.5 z-10 flex size-3 items-center justify-center rounded-full bg-white/20 ring-4 ring-surface"></div>
            <div>
              <p className="font-bold text-white">Daily Meditation - 15 mins</p>
              <p className="text-sm text-white/60">
                vs Jenna - <span className="font-semibold text-primary">$20</span>
              </p>
            </div>
            <div className="ml-auto whitespace-nowrap rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/80">
              14h left
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingDeadlines;
