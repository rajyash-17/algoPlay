import { describe, it, expect } from 'vitest';
import { getCleanDisplayCode } from '@/lib/codeFormatter';

describe('Code Formatter for UI Display', () => {
  it('hides note() emit lines from display code and maps line numbers correctly', () => {
    const rawCode = `function test(arr) {
  let left = 0;
  note("Starting search");
  let right = arr.length - 1;
  return [left, right];
}`;

    const { displayCode, rawToDisplayLine } = getCleanDisplayCode(rawCode);

    // Verify display code does NOT contain note(...)
    expect(displayCode).not.toContain('note(');
    expect(displayCode).not.toContain('Starting search');

    const displayLines = displayCode.split('\n');
    expect(displayLines.length).toBe(5); // Original 6 minus 1 note line
    expect(displayLines[0]).toBe('function test(arr) {');
    expect(displayLines[1]).toBe('  let left = 0;');
    expect(displayLines[2]).toBe('  let right = arr.length - 1;');
    expect(displayLines[3]).toBe('  return [left, right];');
    expect(displayLines[4]).toBe('}');

    // Line 1 -> 1
    expect(rawToDisplayLine[1]).toBe(1);
    // Line 2 -> 2
    expect(rawToDisplayLine[2]).toBe(2);
    // Line 3 (note line) -> 3 (mapped to next line)
    expect(rawToDisplayLine[3]).toBe(3);
    // Line 4 -> 3
    expect(rawToDisplayLine[4]).toBe(3);
    // Line 5 -> 4
    expect(rawToDisplayLine[5]).toBe(4);
  });
});
