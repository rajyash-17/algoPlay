import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'head',
  structures: [
    { name: 'head', type: 'linked-list', label: 'Original List with Random Pointers' },
  ],
  roleMappings: [
    { variable: 'curr', role: 'pointer', label: 'curr' },
  ],
};
