import { create } from 'zustand';
import { Step, TraceResult } from '@/engine/types';

export interface PlayerState {
  steps: Step[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number; // 0.5, 1, 1.5, 2, 4
  traceResult: TraceResult | null;
  isLoading: boolean;

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
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  speed: 1,
  traceResult: null,
  isLoading: false,

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
    // If at the end, restart from beginning
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
    const { currentStepIndex, steps, pause } = get();
    if (currentStepIndex < steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      pause();
    }
  },

  stepBackward: () => {
    const { currentStepIndex, pause } = get();
    pause();
    if (currentStepIndex > 0) {
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

  getCurrentStep: () => {
    const { steps, currentStepIndex } = get();
    if (steps.length === 0 || currentStepIndex < 0 || currentStepIndex >= steps.length) {
      return null;
    }
    return steps[currentStepIndex] ?? null;
  },
}));
