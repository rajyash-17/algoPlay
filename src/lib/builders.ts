/**
 * Data structure constructors and serializes for Linked Lists and Binary Trees.
 * Used by problem test cases (inputs.ts) and engine execution.
 */

export interface ListNode {
  val: number | string;
  next: ListNode | null;
  random?: ListNode | null;
}

export interface TreeNode {
  val: number | string;
  left: TreeNode | null;
  right: TreeNode | null;
}

/**
 * Creates a linked list from an array of values.
 * Optionally connects the tail to the node at `cycleIndex` to create a cycle.
 */
export function listFromArray(arr: (number | string)[], cycleIndex: number = -1): ListNode | null {
  if (!arr || arr.length === 0) return null;

  const nodes: ListNode[] = arr.map((val) => ({ val, next: null }));

  for (let i = 0; i < nodes.length - 1; i++) {
    const curr = nodes[i];
    const next = nodes[i + 1];
    if (curr && next) {
      curr.next = next;
    }
  }

  // Create cycle if cycleIndex is valid
  if (cycleIndex >= 0 && cycleIndex < nodes.length) {
    const tail = nodes[nodes.length - 1];
    const target = nodes[cycleIndex];
    if (tail && target) {
      tail.next = target;
    }
  }

  return nodes[0] ?? null;
}

/**
 * Converts a linked list back into an array of values.
 * Safeguarded with cycle detection up to maxNodes.
 */
export function listToArray(head: ListNode | null, maxNodes: number = 200): (number | string)[] {
  const result: (number | string)[] = [];
  const visited = new Set<ListNode>();
  let curr = head;

  while (curr && !visited.has(curr) && result.length < maxNodes) {
    visited.add(curr);
    result.push(curr.val);
    curr = curr.next;
  }

  return result;
}

/**
 * Builds a binary tree from a LeetCode standard level-order array:
 * e.g. [3, 9, 20, null, null, 15, 7]
 */
export function treeFromLevelOrder(arr: (number | string | null)[]): TreeNode | null {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) {
    return null;
  }

  const root: TreeNode = { val: arr[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const current = queue.shift();
    if (!current) continue;

    // Left child
    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        current.left = { val: leftVal, left: null, right: null };
        queue.push(current.left);
      }
    }

    // Right child
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        current.right = { val: rightVal, left: null, right: null };
        queue.push(current.right);
      }
    }
  }

  return root;
}

/**
 * Serializes a binary tree into a level-order array with trailing nulls trimmed.
 */
export function treeToLevelOrder(root: TreeNode | null): (number | string | null)[] {
  if (!root) return [];

  const result: (number | string | null)[] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // Trim trailing nulls
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}
