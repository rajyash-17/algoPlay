'use client';

import React, { useRef, useEffect } from 'react';

interface CodePanelProps {
  code: string;
  currentLine?: number;
}

export const CodePanel: React.FC<CodePanelProps> = ({ code, currentLine }) => {
  const lines = code.trim().split('\n');
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll active line into view smoothly
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentLine]);

  return (
    <div className="flex flex-col h-full bg-surface border-3 border-ink rounded-lg shadow-standard overflow-hidden">
      {/* Code window title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-canvas border-b-3 border-ink select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger border border-ink" />
          <div className="w-3 h-3 rounded-full bg-primary border border-ink" />
          <div className="w-3 h-3 rounded-full bg-success border border-ink" />
          <span className="ml-2 font-mono text-xs font-bold text-ink">solution.js</span>
        </div>
        <div className="font-mono text-xs text-ink-muted font-semibold">
          {currentLine ? `Line ${currentLine}` : 'Ready'}
        </div>
      </div>

      {/* Code content */}
      <div className="flex-1 overflow-auto p-3 font-mono text-xs sm:text-sm leading-6 bg-surface">
        {lines.map((lineText, index) => {
          const lineNumber = index + 1;
          const isActive = currentLine === lineNumber;

          return (
            <div
              key={lineNumber}
              ref={isActive ? activeLineRef : null}
              className={`flex items-center px-2 py-0.5 rounded transition-colors ${
                isActive
                  ? 'bg-primary text-ink font-bold border-l-4 border-ink shadow-sm'
                  : 'text-ink hover:bg-surface-muted/60'
              }`}
            >
              {/* Line number gutter */}
              <span
                className={`w-8 select-none text-right pr-3 shrink-0 ${
                  isActive ? 'text-ink font-extrabold' : 'text-ink-subtle'
                }`}
              >
                {lineNumber}
              </span>

              {/* Code line */}
              <pre className="font-mono overflow-x-visible whitespace-pre">
                {lineText || ' '}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};
