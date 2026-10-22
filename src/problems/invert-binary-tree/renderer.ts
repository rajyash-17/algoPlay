import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'root',
  structures: [
    { name: 'root', type: 'tree', label: 'Inverted Binary Tree' },
  ],
  roleMappings: [
    { variable: 'root', role: 'pointer', label: 'curr' },
  ],
};
