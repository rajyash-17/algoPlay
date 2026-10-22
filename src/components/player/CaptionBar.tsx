'use client';

import React from 'react';
import { Step } from '@/engine/types';
import { Sparkles, Terminal } from 'lucide-react';

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

  // Format active variables for auto-caption if no explicit note
  const varEntries = Object.entries(step.vars).filter(
    ([key]) => !key.startsWith('__') && key !== 'nums' && key !== 'arr'
  );

  const autoCaption =
    varEntries.length > 0
      ? varEntries.map(([k, v]) => `${k} = ${JSON.stringify(v)}`).join('  |  ')
      : `Executing line ${step.line}`;

  return (
    <div className="w-full bg-surface border-3 border-ink rounded-lg shadow-standard p-4 flex items-start gap-3 transition-all">
      <div className="p-2 bg-primary border-2 border-ink rounded shadow-sm shrink-0 mt-0.5">
        <Sparkles className="w-4 h-4 text-ink" />
      </div>

      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-ink uppercase tracking-wide">
            {step.note ? 'EXPLANATION' : 'STEP STATE'}
          </span>
          <span className="font-mono text-xs text-ink-muted">
            Line {step.line}
          </span>
        </div>

        <p className="font-mono text-sm text-ink font-semibold leading-relaxed">
          {step.note ? step.note : autoCaption}
        </p>
      </div>
    </div>
  );
};
