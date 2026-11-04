import { describe, it, expect } from 'vitest';
import { executeTrace } from '../run';
import { getProblemBySlug } from '@/problems';

describe('Stack Problems Execution & Population Verification', () => {
  const stackSlugs = [
    'valid-parentheses',
    'simplify-path',
    'min-stack',
    'evaluate-reverse-polish-notation',
    'basic-calculator',
  ];

  for (const slug of stackSlugs) {
    it(`verifies stack populates and traces correctly for ${slug}`, () => {
      const prob = getProblemBySlug(slug);
      expect(prob).toBeDefined();

      // Verify Case 1 populates the stack
      const case1 = prob!.inputs[0]!;
      const result1 = executeTrace({
        code: prob!.solutionCode,
        args: case1.args,
        rendererConfig: prob!.rendererConfig,
      });

      expect(result1.success).toBe(true);

      let maxStackSize = 0;
      for (const step of result1.steps) {
        for (const s of step.structures) {
          if (s.type === 'stack') {
            const items = (s as any).items || [];
            if (items.length > maxStackSize) {
              maxStackSize = items.length;
            }
          }
        }
        for (const [k, v] of Object.entries(step.vars)) {
          if (k.toLowerCase().includes('stack') && Array.isArray(v)) {
            if (v.length > maxStackSize) {
              maxStackSize = v.length;
            }
          }
        }
      }

      // Ensure Case 1 actually uses and populates the stack visually
      expect(maxStackSize).toBeGreaterThan(0);
    });
  }
});
