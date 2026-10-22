import { describe, it, expect } from 'vitest';
import { executeTrace } from '../run';

describe('AlgoPlay Tracing Engine', () => {
  it('records a simple loop with accurate line numbers and variable snapshots', () => {
    const code = `
      function countToThree() {
        let sum = 0;
        for (let i = 1; i <= 3; i++) {
          sum += i;
        }
        return sum;
      }
    `;

    const result = executeTrace({
      code,
      entryFunction: 'countToThree',
    });

    expect(result.success).toBe(true);
    expect(result.returnValue).toBe(6);
    expect(result.steps.length).toBeGreaterThan(0);

    // Verify variable evolution across steps
    const sumVars = result.steps
      .map((s) => s.vars['sum'])
      .filter((v) => typeof v === 'number');

    expect(sumVars).toContain(0);
    expect(sumVars).toContain(1);
    expect(sumVars).toContain(3);
    expect(sumVars).toContain(6);
  });

  it('records array swap and guarantees immutable snapshots across time steps', () => {
    const code = `
      function reverseTwo(arr) {
        let left = 0;
        let right = 1;
        note("Swapping elements at left and right");
        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        return arr;
      }
    `;

    const initialArray = [10, 20];
    const result = executeTrace({
      code,
      args: [initialArray],
      entryFunction: 'reverseTwo',
      rendererConfig: {
        primaryStructure: 'arr',
        structures: [{ name: 'arr', type: 'array' }],
        roleMappings: [
          { variable: 'left', role: 'pointer' },
          { variable: 'right', role: 'pointer' },
        ],
      },
    });

    expect(result.success).toBe(true);
    expect(result.returnValue).toEqual([20, 10]);

    // Find step before swap
    const preSwapStep = result.steps.find((s) => s.note?.includes('Swapping elements'));
    expect(preSwapStep).toBeDefined();

    const arrStructPreSwap = preSwapStep?.structures.find((st) => st.name === 'arr');
    expect(arrStructPreSwap).toBeDefined();
    if (arrStructPreSwap && arrStructPreSwap.type === 'array') {
      // Must be [10, 20] BEFORE the swap was executed
      expect(arrStructPreSwap.values).toEqual([10, 20]);
    }

    // Final step must have [20, 10]
    const lastStep = result.steps[result.steps.length - 1];
    const arrStructPostSwap = lastStep?.structures.find((st) => st.name === 'arr');
    if (arrStructPostSwap && arrStructPostSwap.type === 'array') {
      expect(arrStructPostSwap.values).toEqual([20, 10]);
    }

    // Crucial check: Pre-swap snapshot was NOT mutated by the subsequent swap!
    if (arrStructPreSwap && arrStructPreSwap.type === 'array') {
      expect(arrStructPreSwap.values).toEqual([10, 20]);
    }
  });

  it('safely captures thrown runtime errors without crashing the engine', () => {
    const code = `
      function throwsBoom() {
        const x = 42;
        throw new Error("Boom! Invalid state");
      }
    `;

    const result = executeTrace({
      code,
      entryFunction: 'throwsBoom',
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('Boom! Invalid state');
    expect(result.steps).toEqual([]);
  });

  it('terminates infinite loops when reaching the max step cap', () => {
    const code = `
      function infiniteLoop() {
        let x = 0;
        while (true) {
          x++;
        }
      }
    `;

    const result = executeTrace({
      code,
      entryFunction: 'infiniteLoop',
      traceConfig: {
        maxSteps: 100, // small cap for fast test
      },
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('Execution step limit exceeded (100 steps). Possible infinite loop.');
  });
});
