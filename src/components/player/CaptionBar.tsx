'use client';

import React from 'react';
import { Step } from '@/engine/types';
import { Sparkles, Terminal, Cpu } from 'lucide-react';
import { formatSnapshotValue } from '@/lib/formatValue';

interface CaptionBarProps {
  step: Step | null;
}

export const CaptionBar: React.FC<CaptionBarProps> = ({ step }) => {
  if (!step) {
    return (
      <div className="w-full bg-surface-muted border-3 border-ink rounded-lg shadow-standard p-4 flex items-center gap-3">
        <Terminal className="w-5 h-5 text-ink-muted" />
        <span className="font-mono text-sm text-ink-muted">
          Click Play or Step Forward to start execution.
        </span>
      </div>
    );
  }

  // Filter and format active variables cleanly
  const varEntries = Object.entries(step.vars)
    .filter(([key, val]) => {
      if (key.startsWith('__')) return false;
      if (typeof val === 'function') return false;
      if (typeof val === 'string' && (val.startsWith('function ') || val.startsWith('class ') || val.includes('=>'))) return false;
      return true;
    })
    .map(([name, val]) => ({
      name,
      displayValue: formatSnapshotValue(val),
    }));

  // Auto-generate a readable narrative headline when no explicit note was supplied
  const getAutoHeadline = (): string => {
    // Check for pointer highlights
    const pointer = step.highlights.find((h) => h.role === 'pointer');
    if (pointer) {
      if (typeof pointer.index === 'number') {
        return `Inspecting index ${pointer.index} (${pointer.label ?? 'pointer'})`;
      }
      return `At ${pointer.label ?? 'node'}`;
    }

    // Check for swap / push / pop operations
    const opHighlight = step.highlights.find((h) => h.operation);
    if (opHighlight?.operation) {
      return `Operation: ${opHighlight.operation.toUpperCase()}`;
    }

    return `State at line ${step.line}`;
  };

  const isExplanation = Boolean(step.note);

  return (
    <div className="w-full bg-surface border-3 border-ink rounded-lg shadow-standard p-4 flex items-start gap-3 transition-all">
      <div
        className={`p-2 border-2 border-ink rounded shadow-sm shrink-0 mt-0.5 ${
          isExplanation ? 'bg-primary' : 'bg-accent'
        }`}
      >
        {isExplanation ? (
          <Sparkles className="w-4 h-4 text-ink" />
        ) : (
          <Cpu className="w-4 h-4 text-ink" />
        )}
      </div>

      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-black text-ink uppercase tracking-wide flex items-center gap-1.5">
            <span>{isExplanation ? 'EXPLANATION' : 'STEP STATE'}</span>
          </span>
          <span className="font-mono text-xs font-bold text-ink-muted bg-surface-muted px-2 py-0.5 rounded border border-ink/20">
            Line {step.line}
          </span>
        </div>

        {/* Narrative Headline */}
        <p className="font-mono text-sm text-ink font-bold leading-relaxed">
          {step.note ? step.note : getAutoHeadline()}
        </p>

        {/* Variable State Chips */}
        {varEntries.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 mt-0.5">
            {varEntries.map((v) => (
              <div
                key={v.name}
                className="flex items-center gap-1.5 bg-surface-muted px-2.5 py-1 rounded border-2 border-ink shadow-xs font-mono text-xs max-w-full"
              >
                <span className="font-bold text-ink-muted shrink-0">{v.name}:</span>
                <span
                  title={v.displayValue}
                  className="font-black text-ink bg-surface px-1.5 py-0.5 rounded border border-ink/30 truncate max-w-[280px] sm:max-w-[420px]"
                >
                  {v.displayValue}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
