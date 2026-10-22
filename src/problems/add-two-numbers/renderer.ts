import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'dummyHead',
  structures: [
    { name: 'dummyHead', type: 'linked-list', label: 'Sum List' },
  ],
  roleMappings: [
    { variable: 'curr', role: 'pointer', label: 'curr' },
  ],
};
