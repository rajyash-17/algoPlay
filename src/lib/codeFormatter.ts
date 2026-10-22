/**
 * Utility to strip internal engine emit calls (e.g. note(...)) from UI display code
 * while maintaining an accurate line-number mapping from raw instrumented source
 * lines to clean display lines.
 */

export interface FormattedCodeResult {
  displayCode: string;
  rawToDisplayLine: Record<number, number>;
}

export function getCleanDisplayCode(rawCode: string): FormattedCodeResult {
  const rawLines = rawCode.trim().split('\n');
  const displayLines: string[] = [];
  const rawToDisplayLine: Record<number, number> = {};

  let currentDisplayLine = 1;

  for (let i = 0; i < rawLines.length; i++) {
    const rawLineNumber = i + 1;
    const line = rawLines[i] ?? '';

    // Check if line is purely an emit/note call: note(...)
    const isEmitCall = /^\s*note\(.*?\);?\s*$/.test(line);

    if (isEmitCall) {
      // Map this emit line to the next available display line (or previous if at end)
      rawToDisplayLine[rawLineNumber] = currentDisplayLine;
    } else {
      displayLines.push(line);
      rawToDisplayLine[rawLineNumber] = currentDisplayLine;
      currentDisplayLine++;
    }
  }

  return {
    displayCode: displayLines.join('\n'),
    rawToDisplayLine,
  };
}
