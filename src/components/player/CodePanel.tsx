'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { getCleanDisplayCode } from '@/lib/codeFormatter';
import { SupportedLanguage, MULTI_LANG_SOLUTIONS } from '@/problems/multiLanguage';
import { ChevronDown } from 'lucide-react';

interface CodePanelProps {
  rawCode: string;
  currentLine?: number;
  slug?: string;
}

const LANGUAGES: SupportedLanguage[] = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'];

export const CodePanel: React.FC<CodePanelProps> = ({ rawCode, currentLine, slug }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('JavaScript');
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  // Strip emit calls from raw code and generate clean JS line map
  const { displayCode: cleanJsCode, rawToDisplayLine } = useMemo(() => {
    return getCleanDisplayCode(rawCode);
  }, [rawCode]);

  // Retrieve language implementation (code and line map)
  const langImpl = useMemo(() => {
    if (!slug) return null;
    return MULTI_LANG_SOLUTIONS[slug]?.[selectedLanguage] ?? null;
  }, [slug, selectedLanguage]);

  // Determine active displayed code based on selected language
  const displayedCode = useMemo(() => {
    if (langImpl?.code) {
      return langImpl.code;
    }
    return cleanJsCode;
  }, [langImpl, cleanJsCode]);

  const lines = displayedCode.trim().split('\n');

  // Compute active line for the selected language
  const mappedDisplayLine = useMemo(() => {
    if (!currentLine) return undefined;

    // 1. Map raw instrumented line to clean JS line
    const cleanJsLine = rawToDisplayLine[currentLine] ?? currentLine;

    // 2. If JavaScript, return clean JS line
    if (selectedLanguage === 'JavaScript') {
      return cleanJsLine;
    }

    // 3. For any other language (Python, Java, C++, TypeScript), use its dedicated lineMap
    if (langImpl?.lineMap) {
      return langImpl.lineMap[cleanJsLine] ?? cleanJsLine;
    }

    return cleanJsLine;
  }, [currentLine, rawToDisplayLine, selectedLanguage, langImpl]);

  // Smoothly scroll active line into view
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [mappedDisplayLine]);

  return (
    <div className="flex flex-col h-full bg-surface border-3 border-ink rounded-lg shadow-standard overflow-hidden">
      {/* Code window title bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-canvas border-b-3 border-ink select-none gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <div className="w-2.5 h-2.5 rounded-full bg-danger border border-ink" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary border border-ink" />
            <div className="w-2.5 h-2.5 rounded-full bg-success border border-ink" />
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
              aria-label="Select Programming Language"
              className="appearance-none font-mono text-xs font-bold text-ink bg-surface border-2 border-ink rounded px-2.5 py-1 pr-7 cursor-pointer shadow-sm hover:bg-surface-muted focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-ink pointer-events-none absolute right-2" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-ink font-bold">
            {mappedDisplayLine ? `Line ${mappedDisplayLine}` : 'Ready'}
          </span>
        </div>
      </div>

      {/* Code content */}
      <div className="flex-1 overflow-auto p-3 font-mono text-xs sm:text-sm leading-6 bg-surface">
        {lines.map((lineText, index) => {
          const lineNumber = index + 1;
          const isActive = mappedDisplayLine === lineNumber;

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
