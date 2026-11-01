'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { getAllProblems } from '@/problems';
import { ArrowRight, Code2, Compass, Layers, GitBranch, Terminal, Trophy, Crown, Sparkles } from 'lucide-react';
import { tokens } from '@/lib/tokens';

export default function HomePage() {
  const problems = getAllProblems();

  // Group problems by category
  const problemsByCategory = useMemo(() => {
    const map = new Map<string, typeof problems>();
    for (const p of problems) {
      const cat = p.meta.category || 'General';
      const list = map.get(cat) ?? [];
      list.push(p);
      map.set(cat, list);
    }
    return Array.from(map.entries());
  }, [problems]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'backtracking':
        return <Crown className="w-5 h-5" />;
      case 'stack':
        return <Layers className="w-5 h-5" />;
      case 'linked list':
        return <GitBranch className="w-5 h-5" />;
      case 'binary tree':
      case 'binary tree bfs':
      case 'binary search tree':
        return <Terminal className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8 flex flex-col gap-8">
      {/* Hero Banner */}
      <div className="bg-surface border-3 border-ink rounded-xl shadow-large p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex flex-col gap-2 max-w-2xl z-10">
          <div className="inline-flex items-center gap-2 bg-accent/40 border border-ink px-3 py-1 rounded w-fit font-mono text-xs font-bold text-ink">
            <Compass className="w-3.5 h-3.5" />
            PHASE 2: GRAPHS, TREES, STACKS & QUEUES
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-ink">
            Watch Code Think.
          </h1>
          <p className="text-ink-muted text-base sm:text-lg font-medium leading-relaxed">
            Step through LeetCode Top Interview 150 solutions frame-by-frame with deterministic snapshots,
            animated pointer badges, and synchronized multi-language line highlighting.
          </p>
        </div>

        <div className="bg-primary border-3 border-ink rounded-lg p-4 shadow-standard rotate-1 hidden md:flex flex-col items-center gap-1 min-w-[150px]">
          <span className="font-mono text-4xl font-black text-ink">{problems.length}</span>
          <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
            Problems Active
          </span>
        </div>
      </div>

      {/* Featured Assignment Showcase Card */}
      <div className="bg-accent/30 border-3 border-ink rounded-xl p-5 sm:p-6 shadow-standard flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="flex flex-col gap-2 max-w-2xl z-10">
          <div className="flex items-center gap-2">
            <span className="bg-ink text-primary font-mono text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <Crown className="w-3 h-3 fill-primary text-primary" />
              Coursework Assignment
            </span>
            <span className="font-mono text-xs font-bold text-ink-muted">
              Backtracking & 2D Chessboard Simulation
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-mono text-ink flex items-center gap-2">
            N-Queens Problem (#51 & #52)
          </h2>

          <p className="text-ink-muted text-xs sm:text-sm font-medium leading-relaxed">
            Directly test and explore the N-Queens assignment with frame-by-frame chessboard animations, live queen placements, attack ray crosshairs, and multi-language backtracking solutions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10 shrink-0">
          <Link
            href="/problems/n-queens"
            className="px-4 py-2 bg-primary hover:bg-primary-hover border-2 border-ink rounded-lg font-mono text-xs font-black text-ink shadow-standard hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2"
          >
            <Crown className="w-4 h-4 fill-ink text-ink" />
            <span>Launch #51 N-Queens</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/problems/n-queens-ii"
            className="px-3 py-2 bg-surface hover:bg-surface-muted border-2 border-ink rounded-lg font-mono text-xs font-bold text-ink shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5"
          >
            <span>#52 N-Queens II</span>
          </Link>
        </div>
      </div>

      {/* Categorized Problem Sections */}
      <div className="flex flex-col gap-10">
        {problemsByCategory.map(([category, catProblems], catIdx) => {
          return (
            <div key={category} className="flex flex-col gap-4">
              {/* Category Header with Arcade Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b-3 border-ink">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-canvas border-2 border-ink rounded shadow-sm text-ink">
                    {getCategoryIcon(category)}
                  </div>
                  <div>
                    <h2 className="text-xl font-mono font-black text-ink">
                      {category}
                    </h2>
                    <span className="font-mono text-xs text-ink-muted font-bold">
                      {catProblems.length} {catProblems.length === 1 ? 'problem' : 'problems'}
                    </span>
                  </div>
                </div>

                {/* Arcade Level & Progress Badge */}
                <div className="flex items-center gap-2 bg-surface px-3 py-1.5 border-2 border-ink rounded shadow-sm font-mono text-xs font-bold">
                  <div className="flex items-center gap-1 text-ink">
                    <Trophy className="w-3.5 h-3.5 text-warning fill-warning" />
                    <span>TIER {catIdx + 1}</span>
                  </div>
                  <span className="text-ink-subtle">|</span>
                  <span className="bg-primary px-1.5 py-0.5 rounded border border-ink text-ink text-[10px] font-black">
                    {catProblems.length} / {catProblems.length} UNLOCKED
                  </span>
                </div>
              </div>

              {/* Problem Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {catProblems.map((problem) => {
                  const { meta } = problem;
                  const diffStyle = tokens.colors.difficulty[meta.difficulty];

                  return (
                    <Link
                      key={meta.slug}
                      href={`/problems/${meta.slug}`}
                      className="group flex flex-col justify-between bg-surface border-3 border-ink rounded-xl shadow-standard hover:shadow-large hover:-translate-y-1 transition-all p-5"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-ink-muted">
                            #{meta.number}
                          </span>
                          <span
                            style={{ backgroundColor: diffStyle.bg, color: diffStyle.text }}
                            className="font-mono text-xs font-black px-2.5 py-0.5 rounded border border-ink shadow-sm"
                          >
                            {meta.difficulty}
                          </span>
                        </div>

                        <h3 className="font-mono text-lg font-black text-ink group-hover:text-primary-hover transition-colors">
                          {meta.title}
                        </h3>

                        <p className="text-ink-muted text-xs line-clamp-2 leading-relaxed">
                          {meta.description ?? 'Interactive step-by-step algorithmic visualization.'}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t-2 border-surface-muted flex items-center justify-between">
                        <span className="font-mono text-xs font-bold bg-surface-muted text-ink px-2 py-0.5 rounded border border-ink/30">
                          {meta.pattern}
                        </span>

                        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-ink group-hover:translate-x-1 transition-transform">
                          Simulate
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
