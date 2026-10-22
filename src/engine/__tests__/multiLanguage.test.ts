import { describe, it, expect } from 'vitest';
import { MULTI_LANG_SOLUTIONS, SupportedLanguage } from '@/problems/multiLanguage';
import { PROBLEMS } from '@/problems';

describe('Multi-Language Code and Line Synchronization', () => {
  const languages: SupportedLanguage[] = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'];

  for (const problem of PROBLEMS) {
    const slug = problem.meta.slug;

    describe(`Problem: ${slug}`, () => {
      it('has valid implementations and line mappings for all 5 languages', () => {
        const problemImpls = MULTI_LANG_SOLUTIONS[slug];
        expect(problemImpls).toBeDefined();

        for (const lang of languages) {
          const langImpl = problemImpls![lang];
          expect(langImpl).toBeDefined();
          expect(langImpl.code.length).toBeGreaterThan(10);

          const lines = langImpl.code.split('\n');
          expect(lines.length).toBeGreaterThan(3);

          // Verify all line mappings map to existing line numbers in that language
          for (const [_, targetLine] of Object.entries(langImpl.lineMap)) {
            expect(targetLine).toBeGreaterThanOrEqual(1);
            expect(targetLine).toBeLessThanOrEqual(lines.length);
          }
        }
      });
    });
  }
});
