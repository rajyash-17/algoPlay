import { DifficultyLevel, VisualRole } from '@/lib/tokens';

export type PrimitiveSnapshot = number | string | boolean | null | undefined;

export type Snapshot =
  | PrimitiveSnapshot
  | Snapshot[]
  | { [key: string]: Snapshot };

export interface BaseStructureSnapshot {
  id: string;
  name: string;
}

export interface ArrayStructureSnapshot extends BaseStructureSnapshot {
  type: 'array';
  values: Snapshot[];
}

export interface MapEntrySnapshot {
  key: string;
  value: Snapshot;
}

export interface MapStructureSnapshot extends BaseStructureSnapshot {
  type: 'map';
  entries: MapEntrySnapshot[];
}

export interface LinkedListNodeSnapshot {
  id: string;
  val: Snapshot;
  nextId: string | null;
}

export interface LinkedListStructureSnapshot extends BaseStructureSnapshot {
  type: 'linked-list';
  nodes: LinkedListNodeSnapshot[];
  headId: string | null;
}

export interface TreeNodeSnapshot {
  id: string;
  val: Snapshot;
  leftId: string | null;
  rightId: string | null;
}

export interface TreeStructureSnapshot extends BaseStructureSnapshot {
  type: 'tree';
  nodes: TreeNodeSnapshot[];
  rootId: string | null;
}

export interface GridStructureSnapshot extends BaseStructureSnapshot {
  type: 'grid';
  rows: Snapshot[][];
  numRows: number;
  numCols: number;
}

export type StructureSnapshot =
  | ArrayStructureSnapshot
  | MapStructureSnapshot
  | LinkedListStructureSnapshot
  | TreeStructureSnapshot
  | GridStructureSnapshot;

export interface Highlight {
  target: string;
  index?: number;
  indices?: number[];
  role: VisualRole;
  label?: string;
  color?: string;
}

export interface Frame {
  functionName: string;
  args: Record<string, Snapshot>;
  line: number;
}

export interface Step {
  line: number;
  vars: Record<string, Snapshot>;
  structures: StructureSnapshot[];
  highlights: Highlight[];
  note?: string;
  callStack?: Frame[];
}

export interface ProblemMeta {
  slug: string;
  title: string;
  number: number;
  difficulty: DifficultyLevel;
  pattern: string;
  category: string;
  description?: string;
}

export interface RoleMapping {
  variable: string;
  role: VisualRole;
  targetStructure?: string;
  label?: string;
}

export interface RendererConfig {
  primaryStructure: string;
  structures: Array<{
    name: string;
    type: 'array' | 'linked-list' | 'tree' | 'grid' | 'map';
    label?: string;
  }>;
  roleMappings: RoleMapping[];
}

export interface ProblemInput {
  name: string;
  args: unknown[];
  expected?: unknown;
}

export interface TraceConfig {
  maxSteps?: number;
  timeoutMs?: number;
}

export interface TraceResult {
  success: boolean;
  steps: Step[];
  returnValue?: Snapshot;
  error?: string;
  totalSteps: number;
}
