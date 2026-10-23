import {
  Snapshot,
  StructureSnapshot,
  ArrayStructureSnapshot,
  MapStructureSnapshot,
  LinkedListStructureSnapshot,
  LinkedListNodeSnapshot,
  TreeStructureSnapshot,
  TreeNodeSnapshot,
  StackStructureSnapshot,
  QueueStructureSnapshot,
} from './types';

/**
 * Registry to maintain permanent, deterministic object-to-ID mappings across time steps.
 */
export class NodeIdRegistry {
  private objectToId = new WeakMap<object, string>();
  private knownNodesByStructure = new Map<string, Set<object>>();
  private nextId = 1;

  public getId(obj: object, prefix: string = 'node'): string {
    const raw = (obj as { __rawTarget?: object }).__rawTarget ?? obj;
    let id = this.objectToId.get(raw);
    if (!id) {
      id = `${prefix}_${this.nextId++}`;
      this.objectToId.set(raw, id);
    }
    return id;
  }

  public registerStructureNode(structureName: string, obj: object, prefix: string = 'node'): string {
    const raw = (obj as { __rawTarget?: object }).__rawTarget ?? obj;
    let set = this.knownNodesByStructure.get(structureName);
    if (!set) {
      set = new Set<object>();
      this.knownNodesByStructure.set(structureName, set);
    }
    set.add(raw);
    return this.getId(raw, prefix);
  }

  public getStructureNodes(structureName: string): object[] {
    const set = this.knownNodesByStructure.get(structureName);
    return set ? Array.from(set) : [];
  }

  public getExistingId(obj: unknown): string | undefined {
    if (!obj || typeof obj !== 'object') return undefined;
    const raw = (obj as { __rawTarget?: object }).__rawTarget ?? obj;
    return this.objectToId.get(raw);
  }
}

/**
 * Creates an immutable snapshot of any JavaScript value.
 * Primitives are copied directly; objects, arrays, Maps and Sets are deeply cloned.
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
 * Uses NodeIdRegistry for stable graph node identities across time steps.
 */
export function extractStructureSnapshot(
  name: string,
  rawVal: unknown,
  expectedType: 'array' | 'linked-list' | 'tree' | 'grid' | 'map' | 'stack' | 'queue',
  registry: NodeIdRegistry = new NodeIdRegistry()
): StructureSnapshot | null {
  if (rawVal === undefined || rawVal === null) {
    return null;
  }

  const target = (rawVal as { __rawTarget?: unknown }).__rawTarget ?? rawVal;

  if (expectedType === 'array' && Array.isArray(target)) {
    return {
      id: name,
      name,
      type: 'array',
      values: target.map((v) => createSnapshot(v)),
    };
  }

  if (expectedType === 'stack' && Array.isArray(target)) {
    return {
      id: name,
      name,
      type: 'stack',
      items: target.map((v) => createSnapshot(v)),
    };
  }

  if (expectedType === 'queue' && Array.isArray(target)) {
    return {
      id: name,
      name,
      type: 'queue',
      items: target.map((v) => createSnapshot(v)),
    };
  }

  if (expectedType === 'linked-list') {
    if (!target || typeof target !== 'object') return null;

    // 1. Discover reachable nodes in linked traversal order starting from target (head)
    const reachableNodes: object[] = [];
    const visitedSet = new Set<object>();
    let curr: unknown = target;
    let stepCount = 0;
    let hasCycle = false;
    let cycleTargetId: string | null = null;

    while (curr && typeof curr === 'object' && stepCount < 500) {
      stepCount++;
      const rawNode = (curr as { __rawTarget?: object }).__rawTarget ?? (curr as object);
      registry.registerStructureNode(name, rawNode, 'node');

      if (visitedSet.has(rawNode)) {
        hasCycle = true;
        cycleTargetId = registry.getId(rawNode, 'node');
        break;
      }
      visitedSet.add(rawNode);
      reachableNodes.push(rawNode);

      const currObj = curr as { next?: unknown };
      curr = currObj.next;
    }

    // 2. Discover any newly referenced or detached nodes from registry
    const allKnownNodes = registry.getStructureNodes(name);
    if (allKnownNodes.length === 0 && reachableNodes.length === 0) return null;

    // Ordered list: active connected chain from head first, then any detached nodes
    const orderedNodes: Array<{ rawNode: object; isDetached: boolean }> = reachableNodes.map((n) => ({
      rawNode: n,
      isDetached: false,
    }));

    for (const rawNode of allKnownNodes) {
      if (!visitedSet.has(rawNode)) {
        orderedNodes.push({ rawNode, isDetached: true });
      }
    }

    const nodes: LinkedListNodeSnapshot[] = [];
    const targetRaw = (target as { __rawTarget?: object }).__rawTarget ?? (target as object);
    const headId = registry.getId(targetRaw, 'node');

    for (const { rawNode, isDetached } of orderedNodes) {
      const nodeId = registry.getId(rawNode, 'node');
      const nodeObj = rawNode as { val?: unknown; value?: unknown; next?: unknown; random?: unknown };
      const val = nodeObj.val !== undefined ? nodeObj.val : nodeObj.value;

      let nextId: string | null = null;
      if (nodeObj.next && typeof nodeObj.next === 'object') {
        const nextRaw = (nodeObj.next as { __rawTarget?: object }).__rawTarget ?? (nodeObj.next as object);
        nextId = registry.registerStructureNode(name, nextRaw, 'node');
      }

      let randomId: string | null = null;
      if (nodeObj.random && typeof nodeObj.random === 'object') {
        const randRaw = (nodeObj.random as { __rawTarget?: object }).__rawTarget ?? (nodeObj.random as object);
        randomId = registry.registerStructureNode(name, randRaw, 'node');
      }

      nodes.push({
        id: nodeId,
        val: createSnapshot(val),
        nextId,
        randomId,
        isDetached,
      });
    }

    return {
      id: name,
      name,
      type: 'linked-list',
      nodes,
      headId,
      hasCycle,
      cycleTargetId,
    };
  }

  if (expectedType === 'tree') {
    if (!target || typeof target !== 'object') return null;

    const visitedSet = new Set<object>();
    let rootId: string | null = null;

    // Traverse and register all nodes in tree
    function discoverTree(node: unknown): void {
      if (!node || typeof node !== 'object') return;
      const rawNode = (node as { __rawTarget?: object }).__rawTarget ?? (node as object);
      if (visitedSet.has(rawNode)) return;
      visitedSet.add(rawNode);

      const nodeId = registry.registerStructureNode(name, rawNode, 'tree');
      if (!rootId) rootId = nodeId;

      const treeObj = node as { left?: unknown; right?: unknown };
      discoverTree(treeObj.left);
      discoverTree(treeObj.right);
    }

    discoverTree(target);

    const allKnownNodes = registry.getStructureNodes(name);
    if (allKnownNodes.length === 0) return null;

    const nodes: TreeNodeSnapshot[] = [];
    for (const rawNode of allKnownNodes) {
      const nodeId = registry.getId(rawNode, 'tree');
      const treeObj = rawNode as { val?: unknown; left?: unknown; right?: unknown };

      let leftId: string | null = null;
      if (treeObj.left && typeof treeObj.left === 'object') {
        const leftRaw = (treeObj.left as { __rawTarget?: object }).__rawTarget ?? (treeObj.left as object);
        leftId = registry.registerStructureNode(name, leftRaw, 'tree');
      }

      let rightId: string | null = null;
      if (treeObj.right && typeof treeObj.right === 'object') {
        const rightRaw = (treeObj.right as { __rawTarget?: object }).__rawTarget ?? (treeObj.right as object);
        rightId = registry.registerStructureNode(name, rightRaw, 'tree');
      }

      nodes.push({
        id: nodeId,
        val: createSnapshot(treeObj.val),
        leftId,
        rightId,
      });
    }

    return {
      id: name,
      name,
      type: 'tree',
      nodes,
      rootId,
    };
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
    return {
      id: name,
      name,
      type: 'map',
      entries,
    };
  }

  return null;
}
