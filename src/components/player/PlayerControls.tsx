'use client';

import React, { useEffect } from 'react';
import { usePlayerStore } from '@/lib/playerStore';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Minus, Plus } from 'lucide-react';

const PRESET_SPEEDS = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];

export const PlayerControls: React.FC = () => {
  const {
    steps,
    currentStepIndex,
    isPlaying,
    speed,
    play,
    pause,
    togglePlay,
    stepForward,
    stepBackward,
    goToStep,
    restart,
    setSpeed,
  } = usePlayerStore();

  const totalSteps = steps.length;
  const hasSteps = totalSteps > 0;

  // Playback timer loop: lower speed = slower interval, higher speed = faster interval
  useEffect(() => {
    if (!isPlaying || !hasSteps) return;

    // Base interval at 1x is 800ms
    const intervalMs = Math.max(50, Math.round(800 / speed));
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
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        stepForward();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        stepBackward();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        restart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, stepForward, stepBackward, restart]);

  const decreaseSpeed = () => {
    const nextSpeed = Math.max(0.1, Math.round((speed - 0.25) * 100) / 100);
    setSpeed(nextSpeed);
  };

  const increaseSpeed = () => {
    const nextSpeed = Math.min(5, Math.round((speed + 0.25) * 100) / 100);
    setSpeed(nextSpeed);
  };

  return (
    <div className="w-full bg-surface border-3 border-ink rounded-lg shadow-standard p-4 flex flex-col gap-3">
      {/* Scrubber timeline */}
      <div className="flex items-center gap-3 w-full">
        <span className="font-mono text-xs font-bold text-ink whitespace-nowrap min-w-[50px]">
          {hasSteps ? `${currentStepIndex + 1} / ${totalSteps}` : '0 / 0'}
        </span>
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
      </div>

      {/* Control buttons & speed toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Playback action buttons */}
        <div className="flex items-center gap-2">
          {/* Restart */}
          <button
            onClick={restart}
            disabled={!hasSteps}
            title="Restart (R)"
            className="p-2 border-2 border-ink bg-surface rounded shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none disabled:opacity-40 transition-all font-bold text-ink hover:bg-surface-muted"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Step Back */}
          <button
            onClick={stepBackward}
            disabled={!hasSteps || currentStepIndex === 0}
            title="Step Back (Left Arrow)"
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
            title="Step Forward (Right Arrow)"
            className="p-2 border-2 border-ink bg-surface rounded shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none disabled:opacity-40 transition-all font-bold text-ink hover:bg-surface-muted"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Controls: Slower (0.25x) to Faster (4x) with fine adjustments */}
        <div className="flex items-center gap-1.5 bg-surface-muted p-1 border-2 border-ink rounded shadow-sm">
          <button
            onClick={decreaseSpeed}
            title="Decrease speed"
            className="p-1 border border-ink bg-surface hover:bg-canvas rounded font-bold"
          >
            <Minus className="w-3 h-3 text-ink" />
          </button>

          <div className="flex items-center gap-1 overflow-x-auto max-w-[260px] sm:max-w-none">
            {PRESET_SPEEDS.map((rate) => {
              const isActive = speed === rate;
              return (
                <button
                  key={rate}
                  onClick={() => setSpeed(rate)}
                  className={`px-1.5 py-0.5 font-mono text-xs font-bold rounded border ${
                    isActive
                      ? 'bg-secondary text-ink border-ink shadow-sm'
                      : 'bg-transparent text-ink border-transparent hover:bg-surface'
                  }`}
                >
                  {rate}x
                </button>
              );
            })}
          </div>

          <button
            onClick={increaseSpeed}
            title="Increase speed"
            className="p-1 border border-ink bg-surface hover:bg-canvas rounded font-bold"
          >
            <Plus className="w-3 h-3 text-ink" />
          </button>
        </div>
      </div>
    </div>
  );
};
