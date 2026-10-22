import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'nums',
  structures: [
    { name: 'nums', type: 'array', label: 'Sorted Array' },
  ],
  roleMappings: [
    { variable: 'left', role: 'pointer', label: 'L' },
    { variable: 'mid', role: 'pointer', label: 'mid' },
    { variable: 'right', role: 'pointer', label: 'R' },
  ],
};
