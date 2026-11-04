import { create } from 'zustand';
import { Step, TraceResult } from '@/engine/types';

/**
 * Detects if a step is a key algorithmic decision / milestone
 * rather than a low-level intermediate AST statement (e.g. continue, loop counter increment).
 */
export function isDecisionStep(step: Step, prevStep?: Step | null): boolean {
  if (!step) return false;

  // 1. Explicit educational note from problem author
  if (step.note && step.note.trim().length > 0) {
    return true;
  }

  // 2. Discovered solution milestone
  if (prevStep) {
    const prevSol = Array.isArray(prevStep.vars.solutions)
      ? prevStep.vars.solutions.length
      : typeof prevStep.vars.count === 'number'
      ? prevStep.vars.count
      : 0;
    const currSol = Array.isArray(step.vars.solutions)
      ? step.vars.solutions.length
      : typeof step.vars.count === 'number'
      ? step.vars.count
      : 0;
    if (currSol > prevSol) return true;

    // 3. Meaningful grid board change (queen placement or removal)
    const prevGrid = prevStep.structures.find((s) => s.type === 'grid');
    const currGrid = step.structures.find((s) => s.type === 'grid');
    if (
      prevGrid &&
      currGrid &&
      'rows' in prevGrid &&
      'rows' in currGrid &&
      Array.isArray(prevGrid.rows) &&
      Array.isArray(currGrid.rows)
    ) {
      if (JSON.stringify(prevGrid.rows) !== JSON.stringify(currGrid.rows)) {
        return true;
      }
    }
  }

  return false;
}

export interface PlayerState {
  steps: Step[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number;
  traceResult: TraceResult | null;
  isLoading: boolean;
  keyStepsOnly: boolean;

  // Actions
  setTraceResult: (result: TraceResult) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  goToStep: (index: number) => void;
  restart: () => void;
  setSpeed: (speed: number) => void;
  setIsLoading: (loading: boolean) => void;
  getCurrentStep: () => Step | null;
  setKeyStepsOnly: (enabled: boolean) => void;
  toggleKeyStepsOnly: () => void;
  stepToNextDecision: () => void;
  stepToPrevDecision: () => void;
  jumpToNextSolution: () => void;
  jumpToPrevSolution: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  speed: 1,
  traceResult: null,
  isLoading: false,
  keyStepsOnly: false,

  setTraceResult: (result: TraceResult) => {
    set({
      traceResult: result,
      steps: result.steps,
      currentStepIndex: 0,
      isPlaying: false,
      isLoading: false,
    });
  },

  play: () => {
    const { currentStepIndex, steps } = get();
    if (steps.length === 0) return;
    if (currentStepIndex >= steps.length - 1) {
      set({ currentStepIndex: 0, isPlaying: true });
    } else {
      set({ isPlaying: true });
    }
  },

  pause: () => set({ isPlaying: false }),

  togglePlay: () => {
    const { isPlaying, play, pause } = get();
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  },

  stepForward: () => {
    const { currentStepIndex, steps, pause, keyStepsOnly } = get();
    if (currentStepIndex >= steps.length - 1) {
      pause();
      return;
    }

    if (keyStepsOnly) {
      for (let i = currentStepIndex + 1; i < steps.length; i++) {
        if (isDecisionStep(steps[i]!, steps[i - 1])) {
          set({ currentStepIndex: i });
          return;
        }
      }
      set({ currentStepIndex: steps.length - 1 });
      pause();
    } else {
      set({ currentStepIndex: currentStepIndex + 1 });
    }
  },

  stepBackward: () => {
    const { currentStepIndex, steps, pause, keyStepsOnly } = get();
    pause();
    if (currentStepIndex <= 0) return;

    if (keyStepsOnly) {
      for (let i = currentStepIndex - 1; i >= 0; i--) {
        if (isDecisionStep(steps[i]!, i > 0 ? steps[i - 1] : null)) {
          set({ currentStepIndex: i });
          return;
        }
      }
      set({ currentStepIndex: 0 });
    } else {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  goToStep: (index: number) => {
    const { steps } = get();
    const clamped = Math.max(0, Math.min(index, steps.length - 1));
    set({ currentStepIndex: clamped });
  },

  restart: () => {
    set({ currentStepIndex: 0, isPlaying: false });
  },

  setSpeed: (speed: number) => set({ speed }),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  setKeyStepsOnly: (enabled: boolean) => set({ keyStepsOnly: enabled }),

  toggleKeyStepsOnly: () => {
    const { keyStepsOnly, currentStepIndex, steps } = get();
    const nextState = !keyStepsOnly;
    // If activating key steps mode and current step is not a decision step, snap to next decision step
    if (nextState && steps.length > 0) {
      const isCurr = isDecisionStep(steps[currentStepIndex]!, currentStepIndex > 0 ? steps[currentStepIndex - 1] : null);
      if (!isCurr) {
        let nearestIndex = currentStepIndex;
        for (let i = currentStepIndex; i < steps.length; i++) {
          if (isDecisionStep(steps[i]!, i > 0 ? steps[i - 1] : null)) {
            nearestIndex = i;
            break;
          }
        }
        set({ keyStepsOnly: nextState, currentStepIndex: nearestIndex });
        return;
      }
    }
    set({ keyStepsOnly: nextState });
  },

  stepToNextDecision: () => {
    const { currentStepIndex, steps, pause } = get();
    pause();
    for (let i = currentStepIndex + 1; i < steps.length; i++) {
      if (isDecisionStep(steps[i]!, steps[i - 1])) {
        set({ currentStepIndex: i });
        return;
      }
    }
    set({ currentStepIndex: steps.length - 1 });
  },

  stepToPrevDecision: () => {
    const { currentStepIndex, steps, pause } = get();
    pause();
    for (let i = currentStepIndex - 1; i >= 0; i--) {
      if (isDecisionStep(steps[i]!, i > 0 ? steps[i - 1] : null)) {
        set({ currentStepIndex: i });
        return;
      }
    }
    set({ currentStepIndex: 0 });
  },

  jumpToNextSolution: () => {
    const { currentStepIndex, steps, pause } = get();
    pause();
    for (let i = currentStepIndex + 1; i < steps.length; i++) {
      const step = steps[i]!;
      const prev = steps[i - 1];
      const prevSol = prev
        ? Array.isArray(prev.vars.solutions)
          ? prev.vars.solutions.length
          : typeof prev.vars.count === 'number'
          ? prev.vars.count
          : 0
        : 0;
      const currSol = Array.isArray(step.vars.solutions)
        ? step.vars.solutions.length
        : typeof step.vars.count === 'number'
        ? step.vars.count
        : 0;

      if (currSol > prevSol || step.note?.toLowerCase().includes('valid configuration')) {
        set({ currentStepIndex: i });
        return;
      }
    }
  },

  jumpToPrevSolution: () => {
    const { currentStepIndex, steps, pause } = get();
    pause();
    for (let i = currentStepIndex - 1; i >= 0; i--) {
      const step = steps[i]!;
      const prev = i > 0 ? steps[i - 1] : undefined;
      const prevSol = prev
        ? Array.isArray(prev.vars.solutions)
          ? prev.vars.solutions.length
          : typeof prev.vars.count === 'number'
          ? prev.vars.count
          : 0
        : 0;
      const currSol = Array.isArray(step.vars.solutions)
        ? step.vars.solutions.length
        : typeof step.vars.count === 'number'
        ? step.vars.count
        : 0;

      if (currSol > prevSol || step.note?.toLowerCase().includes('valid configuration')) {
        set({ currentStepIndex: i });
        return;
      }
    }
  },

  getCurrentStep: () => {
    const { steps, currentStepIndex } = get();
    if (steps.length === 0 || currentStepIndex < 0 || currentStepIndex >= steps.length) {
      return null;
    }
    return steps[currentStepIndex] ?? null;
  },
}));
