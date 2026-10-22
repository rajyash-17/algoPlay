import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'head',
  structures: [
    { name: 'head', type: 'linked-list', label: 'Rotated List' },
  ],
  roleMappings: [
    { variable: 'newTail', role: 'pointer', label: 'newTail' },
    { variable: 'oldTail', role: 'pointer', label: 'oldTail' },
  ],
};
