import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'root',
  structures: [
    { name: 'root', type: 'tree', label: 'Binary Tree with Next Pointers' },
  ],
  roleMappings: [
    { variable: 'root', role: 'pointer', label: 'root' },
    { variable: 'curr', role: 'pointer', label: 'curr' },
  ],
};
