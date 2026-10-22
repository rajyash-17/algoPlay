import { describe, it, expect } from 'vitest';
import { executeTrace } from '../run';
import { PROBLEMS } from '@/problems';

describe('LeetCode Top 150 Array Problems Engine Trace', () => {
  for (const problem of PROBLEMS) {
    describe(`Problem ${problem.meta.number}: ${problem.meta.title}`, () => {
      for (const inputCase of problem.inputs) {
        it(`runs ${inputCase.name} successfully`, () => {
          const result = executeTrace({
            code: problem.solutionCode,
            args: inputCase.args,
            rendererConfig: problem.rendererConfig,
          });

          expect(result.success).toBe(true);
          expect(result.steps.length).toBeGreaterThan(0);

          if (inputCase.expected !== undefined) {
            expect(result.returnValue).toEqual(inputCase.expected);
          }

          // Verify every step has a valid line number and snapshot
          for (const step of result.steps) {
            expect(step.line).toBeGreaterThan(0);
            expect(typeof step.vars).toBe('object');
            expect(Array.isArray(step.structures)).toBe(true);
            expect(Array.isArray(step.highlights)).toBe(true);
          }
        });
      }
    });
  }
});
