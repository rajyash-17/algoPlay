import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'dummyHead',
  structures: [
    { name: 'dummyHead', type: 'linked-list', label: 'Sum Result' },
    { name: 'l1', type: 'linked-list', label: 'First Number' },
    { name: 'l2', type: 'linked-list', label: 'Second Number' },
  ],
  roleMappings: [
    { variable: 'curr', role: 'pointer', label: 'curr' },
    { variable: 'l1', role: 'pointer', label: 'p1' },
    { variable: 'l2', role: 'pointer', label: 'p2' },
  ],
};
