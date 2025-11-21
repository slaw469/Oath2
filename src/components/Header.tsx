'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { logOut } from '@/lib/auth';
import { useDbUser } from '@/hooks/useDbUser';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { dbUser } = useDbUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't show header on landing page or auth pages
  if (pathname === '/' || pathname?.startsWith('/auth')) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = [
    { href: '/dashboard', label: 'Home' },
    { href: '/arena', label: 'Arena' },
    { href: '/ideas', label: 'Ideas' },
    { href: '/friends', label: 'Friends' },
    { href: '/history', label: 'History' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center whitespace-nowrap border-b border-solid border-white/10 bg-background-dark/80 px-4 py-3 backdrop-blur-sm sm:px-8">
      <div className="flex w-full max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-4 text-white">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h2 className="hidden text-lg font-bold leading-tight tracking-wider text-white md:block">OATH</h2>
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium leading-normal transition-colors hover:text-white ${
                pathname === link.href ? 'text-primary' : 'text-white/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-primary/20 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-primary">
              <span className="truncate">💎 {dbUser?.gems?.toLocaleString() || '0'}</span>
            </button>
          </div>
          <button className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 min-w-0 w-10 bg-surface text-white/80 transition-colors hover:text-white">
            <span className="material-symbols-outlined">notifications</span>
            <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-background-dark bg-danger"></div>
          </button>
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer transition-opacity hover:opacity-80 flex items-center justify-center bg-primary/20"
              style={
                user?.photoURL
                  ? { backgroundImage: `url("${user.photoURL}")` }
                  : {}
              }
            >
              {!user?.photoURL && (
                <span className="text-lg font-bold text-primary">
                  {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              )}
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-surface border border-white/10 shadow-lg overflow-hidden z-50">
                <div className="p-3 border-b border-white/10">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-white/60 truncate">{user?.email}</p>
                </div>
                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors border-t border-white/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
