import {
  Snapshot,
  StructureSnapshot,
  ArrayStructureSnapshot,
  MapStructureSnapshot,
  LinkedListStructureSnapshot,
  TreeStructureSnapshot,
} from './types';

/**
 * Creates an immutable snapshot of any JavaScript value.
 * Primitives are copied directly; objects, arrays, Maps and Sets are deeply cloned.
 * WeakSet is used to prevent infinite loops from circular references.
 */
export function createSnapshot(val: unknown, seen = new WeakSet<object>()): Snapshot {
  if (val === null || val === undefined) {
    return val as Snapshot;
  }

  const type = typeof val;
  if (type === 'number' || type === 'string' || type === 'boolean') {
    return val as Snapshot;
  }

  if (type === 'bigint') {
    return val.toString();
  }

  if (type === 'symbol' || type === 'function') {
    return String(val);
  }

  if (typeof val === 'object') {
    // Unbox Proxy if present
    const rawVal = (val as { __rawTarget?: unknown }).__rawTarget ?? val;

    if (seen.has(rawVal as object)) {
      return '[Circular]';
    }
    seen.add(rawVal as object);

    if (Array.isArray(rawVal)) {
      return rawVal.map((item) => createSnapshot(item, seen));
    }

    if (rawVal instanceof Map) {
      const obj: Record<string, Snapshot> = {};
      for (const [k, v] of rawVal.entries()) {
        obj[String(k)] = createSnapshot(v, seen);
      }
      return obj;
    }

    if (rawVal instanceof Set) {
      return Array.from(rawVal).map((item) => createSnapshot(item, seen));
    }

    const record: Record<string, Snapshot> = {};
    for (const key of Object.keys(rawVal)) {
      if (key.startsWith('__')) continue;
      const desc = Object.getOwnPropertyDescriptor(rawVal, key);
      if (desc && desc.enumerable) {
        record[key] = createSnapshot((rawVal as Record<string, unknown>)[key], seen);
      }
    }
    return record;
  }

  return String(val);
}

/**
 * Extracts a structured snapshot representation for data structure renderers.
 */
export function extractStructureSnapshot(
  name: string,
  rawVal: unknown,
  expectedType: 'array' | 'linked-list' | 'tree' | 'grid' | 'map'
): StructureSnapshot | null {
  if (rawVal === undefined || rawVal === null) {
    return null;
  }

  const target = (rawVal as { __rawTarget?: unknown }).__rawTarget ?? rawVal;

  if (expectedType === 'array' && Array.isArray(target)) {
    const arrSnapshot: ArrayStructureSnapshot = {
      id: name,
      name,
      type: 'array',
      values: target.map((v) => createSnapshot(v)),
    };
    return arrSnapshot;
  }

  if (expectedType === 'map') {
    const entries: Array<{ key: string; value: Snapshot }> = [];
    if (target instanceof Map) {
      for (const [k, v] of target.entries()) {
        entries.push({ key: String(k), value: createSnapshot(v) });
      }
    } else if (typeof target === 'object') {
      for (const [k, v] of Object.entries(target)) {
        if (!k.startsWith('__')) {
          entries.push({ key: k, value: createSnapshot(v) });
        }
      }
    }
    const mapSnapshot: MapStructureSnapshot = {
      id: name,
      name,
      type: 'map',
      entries,
    };
    return mapSnapshot;
  }

  if (expectedType === 'linked-list') {
    const nodes: LinkedListStructureSnapshot['nodes'] = [];
    let curr: unknown = target;
    let headId: string | null = null;
    let idx = 0;
    const visited = new Set<unknown>();

    while (curr && typeof curr === 'object' && !visited.has(curr)) {
      visited.add(curr);
      const currObj = curr as { val?: unknown; value?: unknown; next?: unknown };
      const val = currObj.val !== undefined ? currObj.val : currObj.value;
      const nodeId = `node_${idx}`;
      if (idx === 0) headId = nodeId;

      nodes.push({
        id: nodeId,
        val: createSnapshot(val),
        nextId: currObj.next ? `node_${idx + 1}` : null,
      });

      curr = currObj.next;
      idx++;
      if (idx > 500) break;
    }

    return {
      id: name,
      name,
      type: 'linked-list',
      nodes,
      headId,
    };
  }

  if (expectedType === 'tree') {
    const nodes: TreeStructureSnapshot['nodes'] = [];
    let rootId: string | null = null;
    let counter = 0;
    const visited = new Set<unknown>();

    function traverseTree(node: unknown): string | null {
      if (!node || typeof node !== 'object' || visited.has(node)) {
        return null;
      }
      visited.add(node);
      const nodeId = `tree_${counter++}`;
      if (!rootId) rootId = nodeId;

      const treeObj = node as { val?: unknown; left?: unknown; right?: unknown };
      const leftId = traverseTree(treeObj.left);
      const rightId = traverseTree(treeObj.right);

      nodes.push({
        id: nodeId,
        val: createSnapshot(treeObj.val),
        leftId,
        rightId,
      });

      return nodeId;
    }

    traverseTree(target);

    return {
      id: name,
      name,
      type: 'tree',
      nodes,
      rootId,
    };
  }

  return null;
}
