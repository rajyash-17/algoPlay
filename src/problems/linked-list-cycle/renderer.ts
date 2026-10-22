import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'head',
  structures: [
    { name: 'head', type: 'linked-list', label: 'Cycle List' },
  ],
  roleMappings: [
    { variable: 'slow', role: 'pointer', label: 'slow' },
    { variable: 'fast', role: 'pointer', label: 'fast' },
  ],
};
