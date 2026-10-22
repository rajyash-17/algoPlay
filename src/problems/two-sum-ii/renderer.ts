import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'numbers',
  structures: [
    { name: 'numbers', type: 'array', label: 'Sorted Array' },
  ],
  roleMappings: [
    { variable: 'left', role: 'pointer', label: 'left' },
    { variable: 'right', role: 'pointer', label: 'right' },
  ],
};
