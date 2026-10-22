import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'root',
  structures: [
    { name: 'root', type: 'tree', label: 'Binary Tree' },
  ],
  roleMappings: [
    { variable: 'root', role: 'pointer', label: 'root' },
    { variable: 't1', role: 'pointer', label: 't1' },
    { variable: 't2', role: 'pointer', label: 't2' },
  ],
};
