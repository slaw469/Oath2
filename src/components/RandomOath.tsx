'use client';

import React, { useState } from 'react';

interface OathData {
  challenge: string;
  frequency: string;
  stake: string;
}

const RANDOM_OATHS: OathData[] = [
  { challenge: 'Daily journaling', frequency: '7-day streak', stake: '$15' },
  { challenge: 'Morning meditation', frequency: '5 days/week', stake: '$20' },
  { challenge: 'Read for 30 minutes', frequency: 'Daily for 14 days', stake: '$25' },
  { challenge: 'No sugar', frequency: '10-day streak', stake: '$30' },
  { challenge: 'Exercise', frequency: '4 days/week for 2 weeks', stake: '$40' },
  { challenge: 'No social media', frequency: '7-day streak', stake: '$20' },
  { challenge: 'Wake up before 7am', frequency: '5 days/week', stake: '$25' },
  { challenge: 'Practice guitar', frequency: 'Daily for 7 days', stake: '$15' },
  { challenge: 'Cold shower', frequency: '5-day streak', stake: '$20' },
  { challenge: 'Learn a new language', frequency: '30 min daily for 10 days', stake: '$30' },
  { challenge: 'Cook at home', frequency: 'All meals for 7 days', stake: '$35' },
  { challenge: 'No caffeine after 2pm', frequency: '14-day streak', stake: '$20' },
  { challenge: 'Drink 8 glasses of water', frequency: 'Daily for 7 days', stake: '$15' },
  { challenge: 'Write 500 words', frequency: 'Daily for 5 days', stake: '$25' },
  { challenge: 'No screen time after 9pm', frequency: '7-day streak', stake: '$30' },
  { challenge: 'Practice gratitude', frequency: 'Daily for 14 days', stake: '$20' },
  { challenge: 'Stretch for 15 minutes', frequency: '5 days/week', stake: '$15' },
  { challenge: 'No procrastinating', frequency: '3-day streak', stake: '$25' },
  { challenge: 'Call a friend', frequency: '3 times/week for 2 weeks', stake: '$20' },
  { challenge: 'Take a walk', frequency: 'Daily for 7 days', stake: '$15' },
  { challenge: 'Practice coding', frequency: '1 hour daily for 10 days', stake: '$35' },
  { challenge: 'Meal prep Sundays', frequency: '4 weeks straight', stake: '$30' },
  { challenge: 'No junk food', frequency: '14-day streak', stake: '$40' },
  { challenge: 'Read a book chapter', frequency: 'Daily for 10 days', stake: '$20' },
  { challenge: 'Declutter 10 items', frequency: 'Daily for 7 days', stake: '$15' },
];

const RandomOath = () => {
  const [currentOath, setCurrentOath] = useState<OathData>(RANDOM_OATHS[0]);

  const generateRandomOath = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_OATHS.length);
    setCurrentOath(RANDOM_OATHS[randomIndex]);
  };

  return (
    <section className="w-full max-w-7xl">
      <div className="rounded border border-primary/20 bg-surface p-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white">Feeling adventurous?</h2>
            <p className="mt-2 text-white/60">Let Oath pick a challenge for you.</p>
            <div className="my-6 space-y-2 rounded bg-background-dark p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-sm uppercase text-white/60">Challenge</span>
                <span className="font-bold text-white">{currentOath.challenge}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-sm uppercase text-white/60">Frequency</span>
                <span className="font-bold text-white">{currentOath.frequency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase text-white/60">Stake</span>
                <span className="font-bold text-primary">{currentOath.stake}</span>
              </div>
            </div>
            <button 
              onClick={generateRandomOath}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-full bg-primary px-8 text-lg font-bold text-background-dark transition-transform hover:scale-105 md:w-auto"
            >
              <span>🎲</span>
              <span>Random Oath</span>
            </button>
            <p className="mt-3 text-xs text-white/60">
              Click to generate a random challenge. You can edit before starting.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded border border-dashed border-white/20 p-6 text-center">
            <p className="font-bold text-white">Your random Oath</p>
            <p className="text-2xl font-medium text-white">{currentOath.challenge}</p>
            <p className="text-lg text-white/80">
              {currentOath.frequency}, <span className="font-bold text-primary">{currentOath.stake} stake</span>
            </p>
            <button className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-white/10 px-6 text-sm font-medium text-white transition-colors hover:bg-white/20">
              Make this an Oath
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomOath;
