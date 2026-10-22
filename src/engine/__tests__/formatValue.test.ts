import { describe, it, expect } from 'vitest';
import { formatSnapshotValue, formatReturnValue, isTreeNode, isListNode, isGraphNode } from '@/lib/formatValue';

describe('Snapshot Value Formatter', () => {
  it('formats primitives correctly', () => {
    expect(formatSnapshotValue(42)).toBe('42');
    expect(formatSnapshotValue('hello')).toBe('"hello"');
    expect(formatSnapshotValue(true)).toBe('true');
    expect(formatSnapshotValue(null)).toBe('null');
    expect(formatSnapshotValue(undefined)).toBe('undefined');
  });

  it('truncates long strings cleanly', () => {
    const longStr = 'a very long sentence that exceeds limits';
    expect(formatSnapshotValue(longStr)).toBe('"a very long sentence t..."');
  });

  it('formats functions cleanly as ƒ()', () => {
    expect(formatSnapshotValue(() => {})).toBe('ƒ()');
    expect(formatSnapshotValue('function dfs(node) { return 0; }')).toBe('ƒ()');
    expect(formatSnapshotValue('(a, b) => a + b')).toBe('ƒ()');
  });

  it('formats tree nodes compactly as Node(val) instead of recursive JSON', () => {
    const treeNode = {
      val: 5,
      left: { val: 3, left: null, right: null },
      right: { val: 8, left: null, right: null },
    };

    expect(isTreeNode(treeNode)).toBe(true);
    expect(formatSnapshotValue(treeNode)).toBe('Node(5)');
  });

  it('formats linked list nodes compactly as Node(val)', () => {
    const listNode = {
      val: 10,
      next: { val: 20, next: { val: 30, next: null } },
    };

    expect(isListNode(listNode)).toBe(true);
    expect(formatSnapshotValue(listNode)).toBe('Node(10)');
  });

  it('formats graph nodes compactly as Node(val)', () => {
    const graphNode = {
      val: 1,
      neighbors: [],
    };

    expect(isGraphNode(graphNode)).toBe(true);
    expect(formatSnapshotValue(graphNode)).toBe('Node(1)');
  });

  it('formats arrays and stack/queue items cleanly', () => {
    expect(formatSnapshotValue([1, 2, 3])).toBe('[1, 2, 3]');
    expect(formatSnapshotValue([1, 2, 3, 4, 5, 6, 7])).toBe('[1, 2, 3, ... (7 items)]');
  });

  it('formats objects and maps cleanly', () => {
    expect(formatSnapshotValue({})).toBe('{}');
    expect(formatSnapshotValue({ a: 1, b: 2 })).toBe('{ a: 1, b: 2 }');
    expect(formatSnapshotValue({ a: 1, b: 2, c: 3, d: 4, e: 5 })).toBe('{ a: 1, b: 2, ... (5 keys) }');
  });

  it('serializes tree return values into array format', () => {
    const treeNode = {
      val: 1,
      left: { val: 2, left: null, right: null },
      right: { val: 3, left: null, right: null },
    };

    expect(formatReturnValue(treeNode)).toBe('[1,2,3]');
  });

  it('serializes list return values into array format', () => {
    const listNode = {
      val: 1,
      next: { val: 2, next: { val: 3, next: null } },
    };

    expect(formatReturnValue(listNode)).toBe('[1,2,3]');
  });
});
