import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'nums',
  structures: [
    { name: 'nums', type: 'array', label: 'Input Array' },
  ],
  roleMappings: [
    { variable: 'i', role: 'pointer', label: 'i' },
  ],
};
