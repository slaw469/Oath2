import React from 'react';

const AllFriends = () => {
  return (
    <section>
      <div className="mb-4">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white">All friends</h3>
        <p className="text-sm text-white/60">Everyone you’ve added on Oath.</p>
      </div>
      <div className="flex flex-col rounded border border-surface bg-surface">
        <div className="flex flex-wrap items-center gap-4 p-4 transition-colors hover:bg-white/5">
          <div className="flex w-full items-center gap-3 sm:w-auto sm:flex-1">
            <div
              className="size-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBm1irWc2tEX-m1gSTFIaHEMS71kFb3G15BpNAgUiM2tD8nABj45PUbZlKpHmUyaTZLNZBjvwn0U92DcpY4AC9BuSCcdDeqIToYIeh4zeZrLkUr3tXmONrK04D9th7BnEe_1MipRPeq1uP9j9981D2qLTZSye9r2EQ0em0Za1qHgjEEEN2_--GAoF_UmhiaSgaBrhPZO3DLme2BvgWr4xllvb-9HZSG88k5kj_h73Ax2dSjYvE0uttjwAuvVZ47vUSIobiZZoFfLOXC')",
              }}
            ></div>
            <div>
              <p className="font-bold text-white">Marcus</p>
              <p className="text-xs text-white/60">@m_becker</p>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/80 sm:grid-cols-3">
            <div>
              Oaths: <span className="font-bold">3</span>
            </div>
            <div>
              Record: <span className="font-bold">2-1</span>
            </div>
            <div>
              Net: <span className="font-bold text-success">+$25</span>
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
            <button className="h-9 rounded-full bg-primary px-5 text-sm font-bold text-background-dark transition-opacity hover:opacity-90">
              Challenge
            </button>
            <button className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20">
              <span className="material-symbols-outlined text-xl">more_horiz</span>
            </button>
          </div>
        </div>
        <div className="mx-4 h-px bg-white/10"></div>
        <div className="flex flex-wrap items-center gap-4 p-4 transition-colors hover:bg-white/5">
          <div className="flex w-full items-center gap-3 sm:w-auto sm:flex-1">
            <div
              className="size-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAy3NDJ_yuC3-vyTGZUjnNmI579PxQOefSSjgbZ0qFriJ5tA-uYu6GJw6m4jlcNoi4scnYVEN_DQTZtyH3hhhCtzp-aGWrvJdUNkPJZLhC-oXfgC__g3Edih7XfuNC_Z8VEhHeXBivsSPsFLsxcBRLnJ1Zykt1jbbh2XuJsGtgFqv0iPxgC7nnfOUU047JDsjDIK6HEbYO5Gkqh6IvQ4JoxETPIRApmuk9D-ErIVwLkyv3YakeJ5tpYpg4HS9yoPbWgJVIox_gAG9aT')",
              }}
            ></div>
            <div>
              <p className="font-bold text-white">Sam</p>
              <p className="text-xs text-white/60">@samwise</p>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/80 sm:grid-cols-3">
            <div>
              Oaths: <span className="font-bold">1</span>
            </div>
            <div>
              Record: <span className="font-bold">0-1</span>
            </div>
            <div>
              Net: <span className="font-bold text-danger">-$25</span>
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
            <button className="h-9 rounded-full bg-primary px-5 text-sm font-bold text-background-dark transition-opacity hover:opacity-90">
              Challenge
            </button>
            <button className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20">
              <span className="material-symbols-outlined text-xl">more_horiz</span>
            </button>
          </div>
        </div>
        <div className="mx-4 h-px bg-white/10"></div>
        <div className="flex flex-wrap items-center gap-4 p-4 transition-colors hover:bg-white/5">
          <div className="flex w-full items-center gap-3 sm:w-auto sm:flex-1">
            <div
              className="size-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkgrxPY2rMZJh4uTdEKkn9qtKQfunneLgfZrXqZEcFgVP-Hl-G1NRgyoO0Mxj0GiMqIoe-P7uV-705o_kduwSHKCJkom3FhqM_PDfBaXSSOBh1dN0vWkI0A5_vZThY25kpUWLlnlON5WVFkXwWEGBSFprrkEkq3VNh8JjswF2d4dtLTWicVaJZM7uzHICw_44wHygmQ2wUyu3Rm9zCRaYs6drDmVYv2ymQIe_QgOoPY0FMzJ74T0I9KZ8A_0pGZdrMQtcwguUoJXoM')",
              }}
            ></div>
            <div>
              <p className="font-bold text-white">Ben</p>
              <p className="text-xs text-white/60">@benny</p>
            </div>
          </div>
          <div className="flex flex-1 items-center">
            <div className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
              No Oaths yet — break the ice.
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
            <button className="relative h-9 rounded-full bg-primary px-5 text-sm font-bold text-background-dark transition-opacity hover:opacity-90">
              Challenge{' '}
              <span className="absolute -right-1 -top-1 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-4 w-4 rounded-full bg-primary"></span>
              </span>
            </button>
            <button className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20">
              <span className="material-symbols-outlined text-xl">more_horiz</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllFriends;
