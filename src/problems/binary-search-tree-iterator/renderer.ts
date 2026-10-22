import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'root',
  structures: [
    { name: 'root', type: 'tree', label: 'Binary Search Tree' },
  ],
  roleMappings: [
    { variable: 'root', role: 'pointer', label: 'root' },
    { variable: 'curr', role: 'pointer', label: 'curr' },
    { variable: 'node', role: 'pointer', label: 'iterating' },
  ],
};
