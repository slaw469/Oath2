import React from 'react';

const PendingRequests = () => {
  return (
    <section>
      <div className="rounded border border-surface bg-surface p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold leading-tight tracking-tight text-white">
            Pending requests
          </h3>
          <p className="text-sm text-white/60">Manage friend requests and invitations.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-white/60">
              Incoming (1)
            </h4>
            <div className="flex items-center gap-3">
              <div
                className="size-10 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAy3NDJ_yuC3-vyTGZUjnNmI579PxQOefSSjgbZ0qFriJ5tA-uYu6GJw6m4jlcNoi4scnYVEN_DQTZtyH3hhhCtzp-aGWrvJdUNkPJZLhC-oXfgC__g3Edih7XfuNC_Z8VEhHeXBivsSPsFLsxcBRLnJ1Zykt1jbbh2XuJsGtgFqv0iPxgC7nnfOUU047JDsjDIK6HEbYO5Gkqh6IvQ4JoxETPIRApmuk9D-ErIVwLkyv3YakeJ5tpYpg4HS9yoPbWgJVIox_gAG9aT')",
                }}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Carla</p>
                <p className="text-xs text-white/60">wants to be your friend</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex size-8 items-center justify-center rounded-full bg-danger/20 text-danger transition-colors hover:bg-danger/30">
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
                <button className="flex size-8 items-center justify-center rounded-full bg-success/20 text-success transition-colors hover:bg-success/30">
                  <span className="material-symbols-outlined text-lg">check</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-white/60">
              Outgoing (1)
            </h4>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-background-dark text-white/60">
                <span className="material-symbols-outlined">alternate_email</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">friend@email.com</p>
                <p className="text-xs text-white/60">Invite sent</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs font-medium text-primary/80 hover:text-primary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PendingRequests;
