import { describe, it, expect } from 'vitest';
import { formatSnapshotValue, formatReturnValue, isTreeNode, isListNode } from '@/lib/formatValue';

describe('Snapshot Value Formatter', () => {
  it('formats primitives correctly', () => {
    expect(formatSnapshotValue(42)).toBe('42');
    expect(formatSnapshotValue('hello')).toBe('"hello"');
    expect(formatSnapshotValue(true)).toBe('true');
    expect(formatSnapshotValue(null)).toBe('null');
    expect(formatSnapshotValue(undefined)).toBe('undefined');
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

  it('formats arrays and stack/queue items cleanly', () => {
    expect(formatSnapshotValue([1, 2, 3])).toBe('[1, 2, 3]');
    expect(formatSnapshotValue([1, 2, 3, 4, 5, 6, 7])).toBe('[1, 2, 3, ... (7 items)]');
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
