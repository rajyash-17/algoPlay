'use client';

import React, { useMemo } from 'react';
import { Step } from '@/engine/types';
import { Sparkles, Terminal, Cpu, GitFork, ArrowRight, Zap } from 'lucide-react';
import { formatSnapshotValue } from '@/lib/formatValue';

interface CaptionBarProps {
  step: Step | null;
  prevStep?: Step | null;
}

const POINTER_NAMES = new Set([
  'left', 'right', 'mid', 'i', 'j', 'k',
  'slow', 'fast', 'curr', 'prev', 'next', 'runner',
  'p', 'q', 'before', 'after', 'head', 'dummy', 'dummyHead', 'sentinel'
]);

export const CaptionBar: React.FC<CaptionBarProps> = ({ step, prevStep }) => {
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

  // Detect which variables changed from previous step (Variable Diffing)
  const changedKeys = useMemo(() => {
    const changed = new Set<string>();
    if (!prevStep) return changed;

    for (const [key, val] of Object.entries(step.vars)) {
      if (key.startsWith('__')) continue;
      const prevVal = prevStep.vars[key];
      // Quick primitive or JSON equality check
      if (prevVal === undefined) {
        changed.add(key);
      } else if (typeof val !== 'object' || val === null) {
        if (val !== prevVal) changed.add(key);
      } else {
        try {
          if (JSON.stringify(val) !== JSON.stringify(prevVal)) {
            changed.add(key);
          }
        } catch {
          changed.add(key);
        }
      }
    }
    return changed;
  }, [step.vars, prevStep]);

  // Filter and format active variables cleanly
  const varEntries = useMemo(() => {
    return Object.entries(step.vars)
      .filter(([key, val]) => {
        if (key.startsWith('__')) return false;
        if (typeof val === 'function') return false;
        if (typeof val === 'string' && (val.startsWith('function ') || val.startsWith('class ') || val.includes('=>'))) return false;
        return true;
      })
      .map(([name, val]) => ({
        name,
        displayValue: formatSnapshotValue(val),
        isChanged: changedKeys.has(name),
        isPointer: POINTER_NAMES.has(name),
      }));
  }, [step.vars, changedKeys]);

  // Auto-generate a readable narrative headline when no explicit note was supplied
  const getAutoHeadline = (): string => {
    // Check for swap / push / pop operations
    const opHighlight = step.highlights.find((h) => h.operation);
    if (opHighlight?.operation) {
      return `Operation: ${opHighlight.operation.toUpperCase()}`;
    }

    // Check if pointer or variable just changed
    if (changedKeys.size > 0) {
      const changedList = Array.from(changedKeys);
      const firstChanged = changedList[0]!;
      const displayVal = formatSnapshotValue(step.vars[firstChanged]);
      const prevVal = prevStep ? formatSnapshotValue(prevStep.vars[firstChanged]) : undefined;

      if (POINTER_NAMES.has(firstChanged)) {
        if (prevVal !== undefined) {
          return `Moved pointer '${firstChanged}' from ${prevVal} to ${displayVal}`;
        }
        return `Positioned pointer '${firstChanged}' at ${displayVal}`;
      }

      if (prevVal !== undefined && prevVal !== 'undefined') {
        return `Updated '${firstChanged}' = ${displayVal} (was ${prevVal})`;
      }
      return `Set '${firstChanged}' = ${displayVal}`;
    }

    // Check for pointer highlights
    const pointer = step.highlights.find((h) => h.role === 'pointer');
    if (pointer) {
      if (typeof pointer.index === 'number') {
        return `Inspecting index ${pointer.index} (${pointer.label ?? 'pointer'})`;
      }
      return `At ${pointer.label ?? 'node'}`;
    }

    return `Executing line ${step.line}`;
  };

  const isExplanation = Boolean(step.note);
  const callStack = step.callStack ?? [];

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

      <div className="flex-1 flex flex-col gap-2 min-w-0">
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

        {/* Call Stack Breadcrumbs (for recursive functions) */}
        {callStack.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5 font-mono text-[11px] text-ink">
            <span className="font-bold text-ink-muted flex items-center gap-1 shrink-0">
              <GitFork className="w-3.5 h-3.5 text-ink" />
              Call Stack ({callStack.length}):
            </span>
            {callStack.map((frame, fIdx) => (
              <div
                key={fIdx}
                className={`px-2 py-0.5 rounded border font-bold flex items-center gap-1 shadow-2xs ${
                  fIdx === callStack.length - 1
                    ? 'bg-primary border-ink text-ink font-black'
                    : 'bg-surface-muted border-ink/30 text-ink-muted'
                }`}
              >
                <span>{frame.functionName}</span>
                {Object.keys(frame.args).length > 0 && (
                  <span className="opacity-80 text-[10px]">
                    ({Object.entries(frame.args)
                      .slice(0, 2)
                      .map(([k, v]) => `${k}:${formatSnapshotValue(v)}`)
                      .join(', ')})
                  </span>
                )}
                {fIdx < callStack.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-ink-muted ml-0.5" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Variable State Chips with Dynamic Diff Highlighting */}
        {varEntries.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 mt-0.5">
            {varEntries.map((v) => (
              <div
                key={v.name}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border-2 border-ink shadow-xs font-mono text-xs max-w-full transition-all ${
                  v.isChanged
                    ? 'bg-primary/25 border-ink ring-2 ring-primary/40 font-black'
                    : 'bg-surface-muted'
                }`}
              >
                <span className="font-bold text-ink-muted shrink-0 flex items-center gap-1">
                  {v.isChanged && (
                    <Zap className="w-3 h-3 text-primary-hover fill-primary" />
                  )}
                  {v.name}:
                </span>
                <span
                  title={v.displayValue}
                  className="font-black text-ink bg-surface px-1.5 py-0.5 rounded border border-ink/30 truncate max-w-[280px] sm:max-w-[420px]"
                >
                  {v.displayValue}
                </span>
                {v.isChanged && (
                  <span className="bg-primary text-ink text-[8px] font-black uppercase px-1 py-0.2 rounded border border-ink shadow-2xs">
                    new
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
