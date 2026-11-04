'use client';

import React, { useEffect, useMemo } from 'react';
import { usePlayerStore, isDecisionStep } from '@/lib/playerStore';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Gauge,
  Sparkles,
  Trophy,
  FastForward,
  Rewind,
} from 'lucide-react';

const PRESET_SPEEDS = [0.1, 0.25, 0.5, 0.75, 1.0];

export const PlayerControls: React.FC = () => {
  const {
    steps,
    currentStepIndex,
    isPlaying,
    speed,
    keyStepsOnly,
    play,
    pause,
    togglePlay,
    stepForward,
    stepBackward,
    goToStep,
    restart,
    setSpeed,
    toggleKeyStepsOnly,
    stepToNextDecision,
    stepToPrevDecision,
    jumpToNextSolution,
  } = usePlayerStore();

  const totalSteps = steps.length;
  const hasSteps = totalSteps > 0;

  // Compute all key decision step indices
  const decisionIndices = useMemo(() => {
    const indices: number[] = [];
    for (let i = 0; i < steps.length; i++) {
      if (isDecisionStep(steps[i]!, i > 0 ? steps[i - 1] : null)) {
        indices.push(i);
      }
    }
    return indices;
  }, [steps]);

  // Current decision index (1-based for readout)
  const currentDecisionNumber = useMemo(() => {
    if (decisionIndices.length === 0) return 0;
    let count = 0;
    for (const idx of decisionIndices) {
      if (idx <= currentStepIndex) {
        count++;
      } else {
        break;
      }
    }
    return Math.max(1, count);
  }, [decisionIndices, currentStepIndex]);

  // Check if trace contains discovered solutions
  const hasSolutions = useMemo(() => {
    return steps.some(
      (s) =>
        (Array.isArray(s.vars.solutions) && s.vars.solutions.length > 0) ||
        (typeof s.vars.count === 'number' && s.vars.count > 0)
    );
  }, [steps]);

  // Playback timer loop: speed ranges from 0.1x (slowest, 7500ms) to 1.0x (normal, 750ms)
  useEffect(() => {
    if (!isPlaying || !hasSteps) return;

    const intervalMs = Math.max(100, Math.round(750 / speed));
    const timer = setInterval(() => {
      const state = usePlayerStore.getState();
      if (state.currentStepIndex >= state.steps.length - 1) {
        state.pause();
      } else {
        state.stepForward();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, speed, hasSteps]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (e.shiftKey) {
          stepToNextDecision();
        } else {
          stepForward();
        }
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (e.shiftKey) {
          stepToPrevDecision();
        } else {
          stepBackward();
        }
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        restart();
      } else if (e.code === 'KeyK') {
        e.preventDefault();
        toggleKeyStepsOnly();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    togglePlay,
    stepForward,
    stepBackward,
    stepToNextDecision,
    stepToPrevDecision,
    restart,
    toggleKeyStepsOnly,
  ]);

  return (
    <div className="w-full bg-surface border-3 border-ink rounded-lg shadow-standard p-4 flex flex-col gap-3">
      {/* Scrubber timeline and mode readouts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2">
          {keyStepsOnly && decisionIndices.length > 0 ? (
            <div className="flex items-center gap-1.5 font-mono text-xs font-black">
              <span className="bg-primary text-ink px-2 py-0.5 rounded border border-ink shadow-xs">
                Key Decision: {currentDecisionNumber} / {decisionIndices.length}
              </span>
              <span className="text-[11px] text-ink-muted">
                (Line {currentStepIndex + 1} of {totalSteps})
              </span>
            </div>
          ) : (
            <span className="font-mono text-xs font-bold text-ink whitespace-nowrap min-w-[60px]">
              {hasSteps ? `Step ${currentStepIndex + 1} / ${totalSteps}` : '0 / 0'}
            </span>
          )}
        </div>

        {/* Mode Toggle & Next Solution Jump */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {decisionIndices.length > 0 && (
            <button
              onClick={toggleKeyStepsOnly}
              title="Toggle between Key Decisions (Queens placed/backtracked) and granular code lines (Key: K)"
              className={`px-2.5 py-1 rounded font-mono text-xs font-black border-2 border-ink shadow-xs flex items-center gap-1.5 transition-all ${
                keyStepsOnly
                  ? 'bg-accent text-ink'
                  : 'bg-surface hover:bg-surface-muted text-ink'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 fill-ink" />
              <span>
                {keyStepsOnly
                  ? `Key Decisions (${decisionIndices.length})`
                  : `All Code Lines (${totalSteps})`}
              </span>
            </button>
          )}

          {hasSolutions && (
            <button
              onClick={jumpToNextSolution}
              title="Jump directly to the next discovered solution configuration"
              className="px-2 py-1 rounded font-mono text-xs font-black border-2 border-ink shadow-xs bg-purple text-surface hover:brightness-110 flex items-center gap-1 transition-all"
            >
              <Trophy className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span className="hidden sm:inline">Next Solution</span>
              <span className="sm:hidden">Next Sol</span>
            </button>
          )}
        </div>
      </div>

      {/* Scrubber slider */}
      <div className="relative flex-1 flex items-center">
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          onChange={(e) => goToStep(Number(e.target.value))}
          disabled={!hasSteps}
          className="w-full h-3 bg-canvas border-2 border-ink rounded-none appearance-none cursor-pointer accent-primary disabled:opacity-50"
          aria-label="Timeline scrubber"
        />
      </div>

      {/* Control buttons & speed slider */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        {/* Playback action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Restart */}
          <button
            onClick={restart}
            disabled={!hasSteps}
            title="Restart (R)"
            className="p-2 border-2 border-ink bg-surface rounded shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none disabled:opacity-40 transition-all font-bold text-ink hover:bg-surface-muted"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Jump Previous Decision */}
          {decisionIndices.length > 0 && (
            <button
              onClick={stepToPrevDecision}
              disabled={!hasSteps || currentStepIndex === 0}
              title="Previous Key Decision (Shift + Left)"
              className="p-2 border-2 border-ink bg-surface rounded shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none disabled:opacity-40 transition-all font-bold text-ink hover:bg-surface-muted"
            >
              <Rewind className="w-4 h-4" />
            </button>
          )}

          {/* Step Back */}
          <button
            onClick={stepBackward}
            disabled={!hasSteps || currentStepIndex === 0}
            title={keyStepsOnly ? 'Previous Key Decision (Left Arrow)' : 'Step Back (Left Arrow)'}
            className="p-2 border-2 border-ink bg-surface rounded shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none disabled:opacity-40 transition-all font-bold text-ink hover:bg-surface-muted"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            disabled={!hasSteps}
            title="Play / Pause (Space)"
            className="px-4 py-2 border-2 border-ink bg-primary text-ink rounded shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none disabled:opacity-40 transition-all font-mono font-bold flex items-center gap-2 hover:bg-primary-hover"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-ink" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-ink" />
                <span>PLAY</span>
              </>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={stepForward}
            disabled={!hasSteps || currentStepIndex >= totalSteps - 1}
            title={keyStepsOnly ? 'Next Key Decision (Right Arrow)' : 'Step Forward (Right Arrow)'}
            className="p-2 border-2 border-ink bg-surface rounded shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none disabled:opacity-40 transition-all font-bold text-ink hover:bg-surface-muted"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Jump Next Decision */}
          {decisionIndices.length > 0 && (
            <button
              onClick={stepToNextDecision}
              disabled={!hasSteps || currentStepIndex >= totalSteps - 1}
              title="Next Key Decision (Shift + Right)"
              className="p-2 border-2 border-ink bg-surface rounded shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none disabled:opacity-40 transition-all font-bold text-ink hover:bg-surface-muted"
            >
              <FastForward className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Speed Slider (0.1x to 1.0x) */}
        <div className="flex items-center gap-3 bg-surface-muted px-3 py-1.5 border-2 border-ink rounded-lg shadow-sm">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-ink">
            <Gauge className="w-3.5 h-3.5 text-ink" />
            <span>SPEED:</span>
            <span className="bg-primary px-1.5 py-0.5 rounded border border-ink text-ink font-black min-w-[42px] text-center">
              {speed.toFixed(2)}x
            </span>
          </div>

          {/* Slider input 0.1x to 1.0x */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-ink-muted">0.1x</span>
            <input
              type="range"
              min={0.1}
              max={1.0}
              step={0.05}
              value={speed}
              onChange={(e) => setSpeed(Math.round(parseFloat(e.target.value) * 100) / 100)}
              aria-label="Speed slider from 0.1x to 1.0x"
              className="w-20 sm:w-32 h-2.5 bg-canvas border border-ink rounded-none appearance-none cursor-pointer accent-secondary"
            />
            <span className="font-mono text-[10px] font-bold text-ink-muted">1.0x</span>
          </div>

          {/* Quick Preset Buttons */}
          <div className="hidden sm:flex items-center gap-1 pl-1 border-l border-ink/20">
            {PRESET_SPEEDS.map((preset) => {
              const isSelected = Math.abs(speed - preset) < 0.02;
              return (
                <button
                  key={preset}
                  onClick={() => setSpeed(preset)}
                  className={`px-1.5 py-0.5 font-mono text-[10px] font-bold rounded border transition-all ${
                    isSelected
                      ? 'bg-secondary text-ink border-ink shadow-sm'
                      : 'bg-surface text-ink border-transparent hover:border-ink/40'
                  }`}
                >
                  {preset}x
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
