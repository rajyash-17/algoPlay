/**
 * Human-readable snapshot value formatting for AlgoPlay.
 * Prevents recursive JSON dumps of pointer-based structures (Trees, Linked Lists)
 * and formats variables into crisp, concise educational tokens.
 */

import { listToArray, treeToLevelOrder, ListNode, TreeNode } from './builders';

export function isTreeNode(val: unknown): boolean {
  if (!val || typeof val !== 'object' || Array.isArray(val)) return false;
  const obj = val as Record<string, unknown>;
  return 'val' in obj && ('left' in obj || 'right' in obj);
}

export function isListNode(val: unknown): boolean {
  if (!val || typeof val !== 'object' || Array.isArray(val)) return false;
  const obj = val as Record<string, unknown>;
  return 'val' in obj && 'next' in obj;
}

export function formatSnapshotValue(val: unknown): string {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (typeof val === 'string') return `"${val}"`;

  // Array formatting
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    if (val.length <= 4) {
      return `[${val.map((item) => formatSnapshotValue(item)).join(', ')}]`;
    }
    const preview = val.slice(0, 3).map((item) => formatSnapshotValue(item)).join(', ');
    return `[${preview}, ... (${val.length} items)]`;
  }

  // Object formatting
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;

    // Tree Node: format as Node(val) instead of recursive subtree dump
    if (isTreeNode(obj)) {
      const nodeVal = obj.val !== undefined ? formatSnapshotValue(obj.val) : '?';
      return `Node(${nodeVal})`;
    }

    // Linked List Node: format as Node(val) instead of recursive list dump
    if (isListNode(obj)) {
      const nodeVal = obj.val !== undefined ? formatSnapshotValue(obj.val) : '?';
      return `Node(${nodeVal})`;
    }

    // Generic node object with 'val'
    if ('val' in obj && Object.keys(obj).length <= 4) {
      return `Node(${formatSnapshotValue(obj.val)})`;
    }

    // Plain Map or Object: compact key-value display
    const keys = Object.keys(obj).filter((k) => !k.startsWith('__'));
    if (keys.length === 0) return '{}';
    if (keys.length <= 3) {
      return `{ ${keys.map((k) => `${k}: ${formatSnapshotValue(obj[k])}`).join(', ')} }`;
    }
    return `{ ${keys.slice(0, 2).map((k) => `${k}: ${formatSnapshotValue(obj[k])}`).join(', ')}, ... }`;
  }

  return String(val);
}

/**
 * Formats function execution return values for completion banners.
 * Converts returned tree roots and linked list heads into their standard array forms.
 */
export function formatReturnValue(val: unknown): string {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';

  if (typeof val === 'object' && val !== null) {
    if (isTreeNode(val)) {
      try {
        const arr = treeToLevelOrder(val as unknown as TreeNode);
        return JSON.stringify(arr);
      } catch {
        return formatSnapshotValue(val);
      }
    }

    if (isListNode(val)) {
      try {
        const arr = listToArray(val as unknown as ListNode);
        return JSON.stringify(arr);
      } catch {
        return formatSnapshotValue(val);
      }
    }
  }

  return JSON.stringify(val);
}
