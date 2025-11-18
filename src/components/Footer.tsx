import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center border-t border-solid border-white/10 px-4 py-6 sm:px-8">
      <div className="flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-white/60">
        <p>Oath — Bet on your discipline.</p>
        <div className="flex items-center gap-6">
          <a className="transition-colors hover:text-white" href="#">Open Source Repo</a>
          <a className="transition-colors hover:text-white" href="#">Docs</a>
          <a className="transition-colors hover:text-white" href="#">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
