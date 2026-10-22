import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'root',
  structures: [
    { name: 'root', type: 'tree', label: 'Flattened Binary Tree' },
  ],
  roleMappings: [
    { variable: 'curr', role: 'pointer', label: 'curr' },
  ],
};
