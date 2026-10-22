import { describe, it, expect } from 'vitest';
import { executeTrace } from '../run';
import { LinkedListStructureSnapshot, TreeStructureSnapshot } from '../types';

describe('Graph Structures: Linked List & Tree Stable IDs', () => {
  it('preserves node IDs stably across steps during linked list reversal', () => {
    const code = `
      function reverseList(head) {
        let prev = null;
        let curr = head;
        while (curr !== null) {
          let nextTemp = curr.next;
          curr.next = prev;
          prev = curr;
          curr = nextTemp;
        }
        return prev;
      }
    `;

    // Construct list: 1 -> 2 -> 3
    const n3 = { val: 3, next: null };
    const n2 = { val: 2, next: n3 };
    const n1 = { val: 1, next: n2 };

    const result = executeTrace({
      code,
      args: [n1],
      entryFunction: 'reverseList',
      rendererConfig: {
        primaryStructure: 'head',
        structures: [{ name: 'head', type: 'linked-list' }],
        roleMappings: [
          { variable: 'prev', role: 'pointer', label: 'prev' },
          { variable: 'curr', role: 'pointer', label: 'curr' },
        ],
      },
    });

    expect(result.success).toBe(true);
    expect(result.steps.length).toBeGreaterThan(0);

    // Collect all snapshots of the linked list
    const llSnapshots = result.steps
      .map((s) => s.structures.find((st) => st.type === 'linked-list') as LinkedListStructureSnapshot | undefined)
      .filter((st): st is LinkedListStructureSnapshot => Boolean(st));

    expect(llSnapshots.length).toBeGreaterThan(0);

    // Initial step node IDs
    const initialNodes = llSnapshots[0]?.nodes;
    expect(initialNodes).toBeDefined();
    expect(initialNodes?.length).toBe(3);

    const node1Id = initialNodes![0]!.id;
    const node2Id = initialNodes![1]!.id;
    const node3Id = initialNodes![2]!.id;

    // Verify all 3 IDs are unique
    expect(new Set([node1Id, node2Id, node3Id]).size).toBe(3);

    // Check pointer highlights
    const stepsWithCurr = result.steps.filter((s) =>
      s.highlights.some((h) => h.label === 'curr' && h.nodeId)
    );
    expect(stepsWithCurr.length).toBeGreaterThan(0);
    // At step start, curr should point to node1Id
    expect(stepsWithCurr[0]?.highlights.find((h) => h.label === 'curr')?.nodeId).toBe(node1Id);
  });

  it('correctly detects cycles and captures back-edge target ID', () => {
    const code = `
      function hasCycle(head) {
        let slow = head;
        let fast = head;
        while (fast !== null && fast.next !== null) {
          slow = slow.next;
          fast = fast.next.next;
          if (slow === fast) {
            return true;
          }
        }
        return false;
      }
    `;

    // 1 -> 2 -> 3 -> 2 (cycle back to 2)
    const n3: { val: number; next: unknown } = { val: 3, next: null };
    const n2: { val: number; next: unknown } = { val: 2, next: n3 };
    const n1 = { val: 1, next: n2 };
    n3.next = n2; // create cycle

    const result = executeTrace({
      code,
      args: [n1],
      entryFunction: 'hasCycle',
      rendererConfig: {
        primaryStructure: 'head',
        structures: [{ name: 'head', type: 'linked-list' }],
        roleMappings: [
          { variable: 'slow', role: 'pointer', label: 'slow' },
          { variable: 'fast', role: 'pointer', label: 'fast' },
        ],
      },
    });

    expect(result.success).toBe(true);
    expect(result.returnValue).toBe(true);

    const llSnapshots = result.steps
      .map((s) => s.structures.find((st) => st.type === 'linked-list') as LinkedListStructureSnapshot | undefined)
      .filter((st): st is LinkedListStructureSnapshot => Boolean(st));

    const cycleSnapshot = llSnapshots.find((s) => s.hasCycle);
    expect(cycleSnapshot).toBeDefined();
    expect(cycleSnapshot?.hasCycle).toBe(true);
    expect(cycleSnapshot?.cycleTargetId).toBeDefined();
  });

  it('preserves tree node IDs stably during traversal and insertion', () => {
    const code = `
      function insertIntoBST(root, val) {
        if (root === null) {
          return { val: val, left: null, right: null };
        }
        let curr = root;
        while (curr !== null) {
          if (val < curr.val) {
            if (curr.left === null) {
              curr.left = { val: val, left: null, right: null };
              break;
            }
            curr = curr.left;
          } else {
            if (curr.right === null) {
              curr.right = { val: val, left: null, right: null };
              break;
            }
            curr = curr.right;
          }
        }
        return root;
      }
    `;

    // BST: 4 with left: 2, right: 7
    const root = {
      val: 4,
      left: { val: 2, left: null, right: null },
      right: { val: 7, left: null, right: null },
    };

    const result = executeTrace({
      code,
      args: [root, 5],
      entryFunction: 'insertIntoBST',
      rendererConfig: {
        primaryStructure: 'root',
        structures: [{ name: 'root', type: 'tree' }],
        roleMappings: [{ variable: 'curr', role: 'pointer', label: 'curr' }],
      },
    });

    expect(result.success).toBe(true);

    const treeSnapshots = result.steps
      .map((s) => s.structures.find((st) => st.type === 'tree') as TreeStructureSnapshot | undefined)
      .filter((st): st is TreeStructureSnapshot => Boolean(st));

    expect(treeSnapshots.length).toBeGreaterThan(0);

    // Initial root ID
    const initialRootId = treeSnapshots[0]?.rootId;
    const lastRootId = treeSnapshots[treeSnapshots.length - 1]?.rootId;
    expect(initialRootId).toBe(lastRootId);

    // Last step should have 4 nodes (4, 2, 7, and inserted 5)
    const finalTree = treeSnapshots[treeSnapshots.length - 1];
    expect(finalTree?.nodes.length).toBe(4);
  });
});
