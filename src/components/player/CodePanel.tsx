'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { getCleanDisplayCode } from '@/lib/codeFormatter';
import { SupportedLanguage, MULTI_LANG_SOLUTIONS } from '@/problems/multiLanguage';
import { ChevronDown, Play } from 'lucide-react';

interface CodePanelProps {
  rawCode: string;
  currentLine?: number;
  slug?: string;
}

const LANGUAGES: SupportedLanguage[] = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'];

const KEYWORDS = new Set([
  'function', 'return', 'const', 'let', 'var', 'if', 'else', 'while', 'for',
  'def', 'class', 'import', 'export', 'new', 'this', 'public', 'private', 'static',
  'try', 'catch', 'finally', 'continue', 'break', 'in', 'of', 'from', 'as', 'pass',
  'and', 'or', 'not', 'is', 'elif', 'auto', 'struct', 'nullptr'
]);

const TYPES = new Set([
  'int', 'boolean', 'bool', 'void', 'string', 'vector', 'ListNode', 'TreeNode',
  'Map', 'Set', 'double', 'float', 'long', 'char', 'String', 'Integer', 'Boolean'
]);

const LITERALS = new Set(['true', 'false', 'null', 'undefined', 'None', 'nullptr']);

function renderHighlightedTokens(lineText: string): React.ReactNode {
  if (!lineText) return ' ';

  // Fast check for whole-line comment
  const trimmed = lineText.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
    return <span className="text-slate-500 italic font-medium">{lineText}</span>;
  }

  // Regex tokenizing into strings, identifiers, numbers, and symbols
  const tokenRegex = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/[^\n]*|#[^\n]*|[a-zA-Z_$][a-zA-Z0-9_$]*|\b\d+\b|[^\s\w]+|\s+)/g;
  const parts: React.ReactNode[] = [];
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = tokenRegex.exec(lineText)) !== null) {
    const token = match[0];
    const key = `${idx++}_${token}`;

    if (!token) continue;

    if (token.startsWith('"') || token.startsWith("'")) {
      parts.push(<span key={key} className="text-emerald-700 font-semibold">{token}</span>);
    } else if (token.startsWith('//') || token.startsWith('#')) {
      parts.push(<span key={key} className="text-slate-500 italic font-medium">{token}</span>);
    } else if (KEYWORDS.has(token)) {
      parts.push(<span key={key} className="text-purple-700 font-black">{token}</span>);
    } else if (TYPES.has(token)) {
      parts.push(<span key={key} className="text-teal-700 font-bold">{token}</span>);
    } else if (LITERALS.has(token) || /^\d+$/.test(token)) {
      parts.push(<span key={key} className="text-amber-700 font-bold">{token}</span>);
    } else {
      parts.push(<span key={key} className="text-ink font-medium">{token}</span>);
    }
  }

  return parts.length > 0 ? parts : lineText;
}

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

  const lines = useMemo(() => {
    return displayedCode.replace(/\r\n/g, '\n').trimEnd().split('\n');
  }, [displayedCode]);

  // Compute active line for the selected language
  const mappedDisplayLine = useMemo(() => {
    if (!currentLine) return undefined;

    // 1. Map raw instrumented line to clean JS line
    const cleanJsLine = rawToDisplayLine[currentLine] ?? currentLine;

    // 2. If JavaScript, return clean JS line
    if (selectedLanguage === 'JavaScript') {
      return Math.min(cleanJsLine, lines.length);
    }

    // 3. For any other language (Python, Java, C++, TypeScript), use its dedicated lineMap
    if (langImpl?.lineMap) {
      const target = langImpl.lineMap[cleanJsLine] ?? cleanJsLine;
      return Math.min(target, lines.length);
    }

    return Math.min(cleanJsLine, lines.length);
  }, [currentLine, rawToDisplayLine, selectedLanguage, langImpl, lines.length]);

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
          <span className="font-mono text-xs text-ink font-bold bg-surface-muted px-2 py-0.5 rounded border border-ink/20">
            {mappedDisplayLine ? `Line ${mappedDisplayLine}` : 'Ready'}
          </span>
        </div>
      </div>

      {/* Code content with Syntax Highlighting and Synced Line Gutter */}
      <div className="flex-1 overflow-auto p-3 font-mono text-xs sm:text-sm leading-6 bg-surface">
        {lines.map((lineText, index) => {
          const lineNumber = index + 1;
          const isActive = mappedDisplayLine === lineNumber;

          return (
            <div
              key={lineNumber}
              ref={isActive ? activeLineRef : null}
              className={`flex items-center px-2 py-0.5 rounded transition-all ${
                isActive
                  ? 'bg-primary/25 text-ink font-bold border-l-4 border-ink shadow-xs'
                  : 'text-ink hover:bg-surface-muted/60'
              }`}
            >
              {/* Line number gutter with active pointer indicator */}
              <span
                className={`w-9 select-none text-right pr-2.5 shrink-0 font-mono text-xs flex items-center justify-end gap-1 ${
                  isActive ? 'text-ink font-black' : 'text-ink-subtle font-medium'
                }`}
              >
                {isActive && (
                  <Play className="w-2.5 h-2.5 fill-ink text-ink animate-pulse" />
                )}
                <span>{lineNumber}</span>
              </span>

              {/* Code line with rich syntax highlighting */}
              <pre className="font-mono overflow-x-visible whitespace-pre pl-1">
                {renderHighlightedTokens(lineText)}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};
