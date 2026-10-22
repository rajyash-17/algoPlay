import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'dummyHead',
  structures: [
    { name: 'dummyHead', type: 'linked-list', label: 'Linked List' },
  ],
  roleMappings: [
    { variable: 'slow', role: 'pointer', label: 'slow' },
    { variable: 'fast', role: 'pointer', label: 'fast' },
  ],
};
