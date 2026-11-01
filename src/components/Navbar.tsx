'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Crown, Sparkles, Trophy, ChevronDown, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isNQueensActive = pathname?.includes('n-queens');

  return (
    <header className="w-full bg-surface border-b-3 border-ink px-4 py-3 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Category Chip */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="bg-primary px-3 py-1 border-2 border-ink rounded shadow-sm group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
              <span className="font-mono text-xl font-black text-ink tracking-tight flex items-center gap-1.5">
                <Zap className="w-5 h-5 fill-ink text-ink" />
                AlgoPlay
              </span>
            </div>
            <span className="hidden sm:inline-block font-mono text-xs font-bold text-ink-muted bg-surface-muted px-2 py-1 border border-ink rounded">
              Top Interview 150
            </span>
          </Link>
        </div>

        {/* Center / Navigation Sections */}
        <div className="flex items-center gap-3">
          {/* Main All Problems Link */}
          <Link
            href="/"
            className={`font-mono text-xs font-bold px-3 py-1.5 rounded border-2 transition-all hidden md:flex items-center gap-1.5 ${
              pathname === '/'
                ? 'bg-surface-muted border-ink shadow-xs text-ink'
                : 'border-transparent text-ink-muted hover:border-ink/30 hover:text-ink'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>All Problems</span>
          </Link>

          {/* DEDICATED ASSIGNMENT SECTION: N-QUEENS */}
          <div className="relative">
            <div
              className={`flex items-center rounded-lg border-2 border-ink shadow-standard transition-all ${
                isNQueensActive
                  ? 'bg-primary ring-2 ring-ink ring-offset-1 ring-offset-canvas'
                  : 'bg-accent/40 hover:bg-accent/60'
              }`}
            >
              {/* Direct Link to N-Queens Problem */}
              <Link
                href="/problems/n-queens"
                className="flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-black text-ink group"
                title="Open N-Queens Assignment"
              >
                <div className="p-0.5 bg-ink rounded text-primary flex items-center justify-center">
                  <Crown className="w-3.5 h-3.5 fill-primary text-primary" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="tracking-tight whitespace-nowrap">N-Queens</span>
                  <span className="bg-ink text-primary text-[9px] font-black uppercase px-1.5 py-0.2 rounded border border-ink shadow-2xs w-fit">
                    Assignment
                  </span>
                </div>
              </Link>

              {/* Sub-menu toggle for N-Queens I & II */}
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                title="Toggle N-Queens Problems Menu"
                className="px-2 py-1.5 border-l-2 border-ink hover:bg-ink/10 transition-colors flex items-center justify-center"
                aria-label="Toggle N-Queens menu"
              >
                <ChevronDown className={`w-3.5 h-3.5 text-ink transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Dropdown Menu for N-Queens Problems */}
            {isDropdownOpen && (
              <div className="absolute right-0 sm:left-0 top-full mt-2 w-64 bg-surface border-3 border-ink rounded-xl shadow-large p-2 z-50 flex flex-col gap-1">
                <div className="px-2 py-1 border-b border-ink/20 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase text-ink-muted">
                    Assignment Problems
                  </span>
                  <span className="bg-primary px-1.5 py-0.2 rounded border border-ink font-mono text-[9px] font-black">
                    Backtracking
                  </span>
                </div>

                <Link
                  href="/problems/n-queens"
                  onClick={() => setIsDropdownOpen(false)}
                  className={`flex items-center justify-between p-2 rounded-lg font-mono text-xs font-bold transition-all ${
                    pathname === '/problems/n-queens'
                      ? 'bg-primary text-ink border border-ink shadow-xs'
                      : 'hover:bg-surface-muted text-ink'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 fill-ink text-ink" />
                    <div className="flex flex-col">
                      <span className="font-black">#51 N-Queens</span>
                      <span className="text-[10px] text-ink-muted font-medium">Full Board Visualizer</span>
                    </div>
                  </div>
                  <span className="bg-red-200 text-red-900 border border-ink text-[9px] font-black px-1.5 py-0.5 rounded">
                    Hard
                  </span>
                </Link>

                <Link
                  href="/problems/n-queens-ii"
                  onClick={() => setIsDropdownOpen(false)}
                  className={`flex items-center justify-between p-2 rounded-lg font-mono text-xs font-bold transition-all ${
                    pathname === '/problems/n-queens-ii'
                      ? 'bg-primary text-ink border border-ink shadow-xs'
                      : 'hover:bg-surface-muted text-ink'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-ink text-ink" />
                    <div className="flex flex-col">
                      <span className="font-black">#52 N-Queens II</span>
                      <span className="text-[10px] text-ink-muted font-medium">Distinct Solutions Count</span>
                    </div>
                  </div>
                  <span className="bg-red-200 text-red-900 border border-ink text-[9px] font-black px-1.5 py-0.5 rounded">
                    Hard
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right: Arcade HUD Progress Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-canvas px-3 py-1 border-2 border-ink rounded shadow-sm font-mono text-xs font-bold">
            <div className="flex items-center gap-1 text-ink">
              <Trophy className="w-3.5 h-3.5 text-warning fill-warning" />
              <span>LVL 1</span>
            </div>
            <span className="text-ink-subtle hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1 text-ink">
              <Sparkles className="w-3.5 h-3.5 text-secondary fill-secondary" />
              <span>150 XP</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
