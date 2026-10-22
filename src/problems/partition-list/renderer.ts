import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'beforeHead',
  structures: [
    { name: 'beforeHead', type: 'linked-list', label: 'Partitioned List' },
  ],
  roleMappings: [
    { variable: 'curr', role: 'pointer', label: 'curr' },
    { variable: 'before', role: 'pointer', label: 'before' },
    { variable: 'after', role: 'pointer', label: 'after' },
  ],
};
