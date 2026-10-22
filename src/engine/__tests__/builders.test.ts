import { describe, it, expect } from 'vitest';
import { listFromArray, listToArray, treeFromLevelOrder, treeToLevelOrder } from '@/lib/builders';

describe('Data Structure Builders and Printers', () => {
  it('converts array to linked list and back', () => {
    const list = listFromArray([1, 2, 3, 4, 5]);
    expect(list).toBeDefined();
    expect(list?.val).toBe(1);
    expect(list?.next?.val).toBe(2);

    const arr = listToArray(list);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles cycle creation and cycle-safe conversion in linked list', () => {
    // 1 -> 2 -> 3 -> 2
    const list = listFromArray([1, 2, 3], 1);
    expect(list?.next?.next?.next?.val).toBe(2);

    const arr = listToArray(list);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('builds binary tree from level order array and serializes back', () => {
    const input = [3, 9, 20, null, null, 15, 7];
    const tree = treeFromLevelOrder(input);

    expect(tree).toBeDefined();
    expect(tree?.val).toBe(3);
    expect(tree?.left?.val).toBe(9);
    expect(tree?.right?.val).toBe(20);
    expect(tree?.right?.left?.val).toBe(15);
    expect(tree?.right?.right?.val).toBe(7);

    const output = treeToLevelOrder(tree);
    expect(output).toEqual(input);
  });
});
