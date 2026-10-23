import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'dummyHead',
  structures: [
    { name: 'dummyHead', type: 'linked-list', label: 'Merged List' },
    { name: 'list1', type: 'linked-list', label: 'List 1' },
    { name: 'list2', type: 'linked-list', label: 'List 2' },
  ],
  roleMappings: [
    { variable: 'curr', role: 'pointer', label: 'curr' },
    { variable: 'list1', role: 'pointer', label: 'L1' },
    { variable: 'list2', role: 'pointer', label: 'L2' },
  ],
};
