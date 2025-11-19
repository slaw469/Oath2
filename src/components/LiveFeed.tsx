import React from 'react';

const LiveFeed = () => {
  const feedItems = [
    { emoji: '🔥', text: 'Alex claimed $50 from Steven for missing his check-in.' },
    { emoji: '👀', text: 'Marcus vs Leah — new Oath started: \'Run 5K daily.\'' },
    { emoji: '💀', text: 'Jason missed deadline — auto payout triggered.' },
    { emoji: '⚔️', text: 'New trending challenge: \'1000 pull-ups streak — $100 pot.\'' },
    { emoji: '🧠', text: 'Will submitted proof: \'Daily LeetCode.\'' },
    { emoji: '💰', text: 'Sarah won $150 from Omar — 30-day meditation streak complete!' },
    { emoji: '🏃', text: 'New oath started: Mike vs Jessica — \'No sugar for 2 weeks\'' },
    { emoji: '✅', text: 'Taylor completed 7-day gym streak — claimed $75!' },
    { emoji: '🎯', text: 'Community milestone: 1000+ active oaths today!' },
    { emoji: '⚡', text: 'Chris missed check-in — $40 transferred to Alex.' },
  ];

  return (
    <div className="mb-10 w-full overflow-hidden bg-black py-3 shadow-lg shadow-primary/20" style={{ boxShadow: '0 0 15px rgba(248, 204, 0, 0.2), 0 0 5px rgba(248, 204, 0, 0.1)' }}>
      <div className="flex animate-scroll whitespace-nowrap hover:[animation-play-state:paused]">
        {/* First set of items */}
        <div className="flex min-w-full shrink-0 items-center justify-around">
          {feedItems.map((item, index) => (
            <div key={`feed-1-${index}`} className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
              <span>{item.emoji}</span>
              <p dangerouslySetInnerHTML={{ __html: item.text.replace(/\$(\d+)/g, '<span class="font-bold text-primary">$$$1</span>') }} />
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div aria-hidden="true" className="flex min-w-full shrink-0 items-center justify-around">
          {feedItems.map((item, index) => (
            <div key={`feed-2-${index}`} className="mx-6 flex items-center gap-3 rounded-full border border-primary/20 px-4 py-1.5 text-sm text-white/80">
              <span>{item.emoji}</span>
              <p dangerouslySetInnerHTML={{ __html: item.text.replace(/\$(\d+)/g, '<span class="font-bold text-primary">$$$1</span>') }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
