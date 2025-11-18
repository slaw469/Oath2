import React from 'react';

const SuggestedConnections = () => {
  return (
    <section>
      <div className="rounded border border-surface bg-surface p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold leading-tight tracking-tight text-white">
            Suggested connections
          </h3>
          <p className="text-sm text-white/60">People you might want to challenge.</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAy3NDJ_yuC3-vyTGZUjnNmI579PxQOefSSjgbZ0qFriJ5tA-uYu6GJw6m4jlcNoi4scnYVEN_DQTZtyH3hhhCtzp-aGWrvJdUNkPJZLhC-oXfgC__g3Edih7XfuNC_Z8VEhHeXBivsSPsFLsxcBRLnJ1Zykt1jbbh2XuJsGtgFqv0iPxgC7nnfOUU047JDsjDIK6HEbYO5Gkqh6IvQ4JoxETPIRApmuk9D-ErIVwLkyv3YakeJ5tpYpg4HS9yoPbWgJVIox_gAG9aT')",
              }}
            ></div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">David</p>
              <p className="text-xs text-white/60">Friend of Alex</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 rounded-full bg-white/10 px-3 text-xs font-medium text-white/80 hover:bg-white/20">
                Ignore
              </button>
              <button className="h-8 rounded-full bg-primary/20 px-3 text-xs font-bold text-primary hover:bg-primary/30">
                Add
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAy3NDJ_yuC3-vyTGZUjnNmI579PxQOefSSjgbZ0qFriJ5tA-uYu6GJw6m4jlcNoi4scnYVEN_DQTZtyH3hhhCtzp-aGWrvJdUNkPJZLhC-oXfgC__g3Edih7XfuNC_Z8VEhHeXBivsSPsFLsxcBRLnJ1Zykt1jbbh2XuJsGtgFqv0iPxgC7nnfOUU047JDsjDIK6HEbYO5Gkqh6IvQ4JoxETPIRApmuk9D-ErIVwLkyv3YakeJ5tpYpg4HS9yoPbWgJVIox_gAG9aT')",
              }}
            ></div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Maria</p>
              <p className="text-xs text-white/60">Friend of Jenna</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 rounded-full bg-white/10 px-3 text-xs font-medium text-white/80 hover:bg-white/20">
                Ignore
              </button>
              <button className="h-8 rounded-full bg-primary/20 px-3 text-xs font-bold text-primary hover:bg-primary/30">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuggestedConnections;
