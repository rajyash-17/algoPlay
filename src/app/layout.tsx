import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Sparkles, Trophy, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AlgoPlay | Animated LeetCode Solutions',
  description: 'Interactive step-by-step algorithmic visualizations for the LeetCode Top Interview 150',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-canvas text-ink antialiased flex flex-col min-h-screen">
        {/* Top Neo-brutalist Navigation Header */}
        <header className="w-full bg-surface border-b-3 border-ink px-4 py-3 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
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

            {/* Arcade HUD Progress Pill */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-canvas px-3 py-1 border-2 border-ink rounded shadow-sm font-mono text-xs font-bold">
                <div className="flex items-center gap-1 text-ink">
                  <Trophy className="w-3.5 h-3.5 text-warning fill-warning" />
                  <span>LVL 1</span>
                </div>
                <span className="text-ink-subtle">|</span>
                <div className="flex items-center gap-1 text-ink">
                  <Sparkles className="w-3.5 h-3.5 text-secondary fill-secondary" />
                  <span>150 XP</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main page body */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
