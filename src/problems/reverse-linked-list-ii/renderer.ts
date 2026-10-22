import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'dummyHead',
  structures: [
    { name: 'dummyHead', type: 'linked-list', label: 'Reversed Sublist' },
  ],
  roleMappings: [
    { variable: 'prev', role: 'pointer', label: 'prev' },
    { variable: 'curr', role: 'pointer', label: 'curr' },
  ],
};
