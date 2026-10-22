import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'p',
  structures: [
    { name: 'p', type: 'tree', label: 'Tree P' },
  ],
  roleMappings: [
    { variable: 'p', role: 'pointer', label: 'p' },
  ],
};
