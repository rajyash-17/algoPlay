'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProblemBySlug, ProblemDefinition } from '@/problems';
import { usePlayerStore } from '@/lib/playerStore';
import { runTrace } from '@/engine/run';
import { RendererHost } from '@/renderers/RendererHost';
import { CodePanel } from '@/components/player/CodePanel';
import { CaptionBar } from '@/components/player/CaptionBar';
import { PlayerControls } from '@/components/player/PlayerControls';
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, BookOpen, Columns, Expand, Maximize2, Minimize2 } from 'lucide-react';
import { tokens } from '@/lib/tokens';
import { formatReturnValue } from '@/lib/formatValue';

export default function ProblemPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const problem = useMemo<ProblemDefinition | undefined>(() => {
    return getProblemBySlug(slug);
  }, [slug]);

  const [selectedInputIndex, setSelectedInputIndex] = useState(0);
  const [isStatementOpen, setIsStatementOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'expanded' | 'theater'>('split');

  const {
    traceResult,
    setTraceResult,
    getCurrentStep,
    isLoading,
    setIsLoading,
    currentStepIndex,
  } = usePlayerStore();

  const currentStep = getCurrentStep();
  const prevStep = currentStepIndex > 0 && traceResult ? traceResult.steps[currentStepIndex - 1] ?? null : null;

  // Load and execute trace on problem or input change
  useEffect(() => {
    if (!problem) return;

    const inputCase = problem.inputs[selectedInputIndex];
    if (!inputCase) return;

    let isMounted = true;
    setIsLoading(true);

    runTrace({
      code: problem.solutionCode,
      args: inputCase.args,
      rendererConfig: problem.rendererConfig,
    }).then((result) => {
      if (isMounted) {
        setTraceResult(result);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [problem, selectedInputIndex, setTraceResult, setIsLoading]);

  if (!problem) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center flex flex-col items-center gap-4">
        <h1 className="text-2xl font-mono font-bold">Problem not found</h1>
        <Link href="/" className="px-4 py-2 bg-primary border-2 border-ink rounded font-mono font-bold">
          Back to Home
        </Link>
      </div>
    );
  }

  const { meta, inputs, solutionCode, rendererConfig } = problem;
  const diffStyle = tokens.colors.difficulty[meta.difficulty];
  const activeInput = inputs[selectedInputIndex];

  return (
    <div className="max-w-[1560px] mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-5 flex-1">
      {/* Top Header Card */}
      <div className="flex flex-col gap-3 bg-surface border-3 border-ink rounded-xl p-4 shadow-standard">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="p-1 hover:bg-surface-muted border border-ink rounded font-mono text-xs font-bold flex items-center gap-1 text-ink"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Problems
              </Link>
              <span className="font-mono text-xs font-bold text-ink-muted">
                #{meta.number}
              </span>
              <span
                style={{ backgroundColor: diffStyle.bg, color: diffStyle.text }}
                className="font-mono text-xs font-black px-2 py-0.5 rounded border border-ink shadow-sm"
              >
                {meta.difficulty}
              </span>
              <span className="font-mono text-xs font-bold bg-surface-muted text-ink px-2 py-0.5 rounded border border-ink/40">
                {meta.pattern}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-mono font-black text-ink">
              {meta.title}
            </h1>
          </div>

          {/* Right Action Bar: Statement, Layout Switcher & Test Case Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Window Layout Switcher */}
            <div className="flex items-center gap-1 bg-surface-muted p-1 rounded-lg border-2 border-ink shadow-xs">
              <button
                onClick={() => setViewMode('split')}
                title="Standard Split View (Code 5 / Canvas 7)"
                className={`font-mono text-xs font-bold px-2 py-1 rounded flex items-center gap-1 transition-all ${
                  viewMode === 'split'
                    ? 'bg-primary text-ink border border-ink shadow-xs'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Split</span>
              </button>
              <button
                onClick={() => setViewMode('expanded')}
                title="Wide Canvas View (Code 4 / Canvas 8)"
                className={`font-mono text-xs font-bold px-2 py-1 rounded flex items-center gap-1 transition-all ${
                  viewMode === 'expanded'
                    ? 'bg-primary text-ink border border-ink shadow-xs'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <Expand className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Wide</span>
              </button>
              <button
                onClick={() => setViewMode('theater')}
                title="Theater View (Full Width Canvas)"
                className={`font-mono text-xs font-bold px-2 py-1 rounded flex items-center gap-1 transition-all ${
                  viewMode === 'theater'
                    ? 'bg-primary text-ink border border-ink shadow-xs'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Theater</span>
              </button>
            </div>

            {/* Problem Statement Dropdown Button */}
            <button
              onClick={() => setIsStatementOpen((prev) => !prev)}
              className="flex items-center gap-1.5 bg-canvas hover:bg-surface-muted px-3 py-1.5 border-2 border-ink rounded font-mono text-xs font-bold shadow-sm transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-ink" />
              <span>Problem Statement</span>
              {isStatementOpen ? (
                <ChevronUp className="w-4 h-4 text-ink" />
              ) : (
                <ChevronDown className="w-4 h-4 text-ink" />
              )}
            </button>

            {/* Input Case Selector */}
            <div className="flex items-center gap-1 ml-1">
              <span className="font-mono text-xs font-bold text-ink-muted mr-1">
                INPUT:
              </span>
              {inputs.map((inp, idx) => {
                const isSelected = selectedInputIndex === idx;
                return (
                  <button
                    key={inp.name}
                    onClick={() => setSelectedInputIndex(idx)}
                    className={`font-mono text-xs font-bold px-2.5 py-1 rounded border-2 border-ink transition-all ${
                      isSelected
                        ? 'bg-primary text-ink shadow-sm'
                        : 'bg-surface text-ink hover:bg-surface-muted'
                    }`}
                  >
                    Case {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Collapsible Problem Statement Panel */}
        {isStatementOpen && (
          <div className="pt-3 border-t-2 border-surface-muted flex flex-col gap-2 bg-canvas p-3 rounded-lg border-2 border-ink shadow-inner">
            <h2 className="font-mono text-xs font-black text-ink uppercase tracking-wider">
              Problem Description
            </h2>
            <p className="font-mono text-xs sm:text-sm text-ink leading-relaxed font-medium">
              {meta.description ?? 'Given the input data, find the solution step-by-step.'}
            </p>
            {activeInput && (
              <div className="mt-1 pt-2 border-t border-ink/20 flex flex-wrap items-center gap-3 font-mono text-xs">
                <span className="text-ink-muted font-bold">Active Input:</span>
                <code className="bg-surface px-2 py-0.5 border border-ink rounded font-semibold text-ink">
                  {activeInput.name}
                </code>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Problem Workspace with Dynamic Responsive Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-[460px]">
        {/* Left Column: Synchronized Multi-Language Code Viewer */}
        <div
          className={`${
            viewMode === 'theater'
              ? 'hidden'
              : viewMode === 'expanded'
              ? 'lg:col-span-4'
              : 'lg:col-span-5'
          } h-[460px] lg:h-auto`}
        >
          <CodePanel
            rawCode={solutionCode}
            currentLine={currentStep?.line}
            slug={slug}
          />
        </div>

        {/* Right Column: Visual Renderer + Step Explanations */}
        <div
          className={`${
            viewMode === 'theater'
              ? 'lg:col-span-12'
              : viewMode === 'expanded'
              ? 'lg:col-span-8'
              : 'lg:col-span-7'
          } flex flex-col gap-4`}
        >
          {/* Active Data Structure Renderer */}
          <div className="flex-1 flex flex-col">
            <RendererHost step={currentStep} config={rendererConfig} />
          </div>

          {/* Dynamic Caption Bar with Auto-Step State, Note display, and Variable Diffing */}
          <CaptionBar step={currentStep} prevStep={prevStep} />

          {/* Return Value / Execution Result Banner if finished */}
          {traceResult && currentStepIndex === traceResult.steps.length - 1 && (
            <div className="bg-success/20 border-3 border-ink rounded-lg p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-ink" />
                <span className="font-mono text-xs font-bold text-ink">
                  Execution Complete • Return Value:
                </span>
              </div>
              <code className="font-mono text-sm font-black bg-surface px-2.5 py-1 rounded border-2 border-ink shadow-sm">
                {formatReturnValue(traceResult.returnValue)}
              </code>
            </div>
          )}

          {traceResult && !traceResult.success && (
            <div className="bg-danger/20 border-3 border-ink rounded-lg p-3 flex items-center gap-2 shadow-sm">
              <AlertCircle className="w-5 h-5 text-danger" />
              <span className="font-mono text-xs font-bold text-danger">
                {traceResult.error}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Player Controls Bar */}
      <div className="w-full sticky bottom-4 z-40">
        <PlayerControls />
      </div>
    </div>
  );
}
