import React from 'react';
import Link from 'next/link';
import { getAllProblems } from '@/problems';
import { ArrowRight, Code2, Compass } from 'lucide-react';
import { tokens } from '@/lib/tokens';

export default function HomePage() {
  const problems = getAllProblems();

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8 flex flex-col gap-8">
      {/* Hero Banner */}
      <div className="bg-surface border-3 border-ink rounded-xl shadow-large p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex flex-col gap-2 max-w-2xl z-10">
          <div className="inline-flex items-center gap-2 bg-accent/40 border border-ink px-3 py-1 rounded w-fit font-mono text-xs font-bold text-ink">
            <Compass className="w-3.5 h-3.5" />
            PHASE 1: ARRAY & POINTER TRACING
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-ink">
            Watch Code Think.
          </h1>
          <p className="text-ink-muted text-base sm:text-lg font-medium leading-relaxed">
            Step through LeetCode solutions frame-by-frame with deterministic snapshots,
            animated pointers, and synchronized line highlighting.
          </p>
        </div>

        <div className="bg-primary border-3 border-ink rounded-lg p-4 shadow-standard rotate-1 hidden md:flex flex-col items-center gap-1 min-w-[150px]">
          <span className="font-mono text-4xl font-black text-ink">{problems.length}</span>
          <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
            Problems Active
          </span>
        </div>
      </div>

      {/* Problem Cards Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-mono font-black text-ink flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            LeetCode Top Interview 150
          </h2>
          <span className="font-mono text-xs font-bold text-ink-muted">
            5 problems loaded
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((problem) => {
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
    </div>
  );
}
