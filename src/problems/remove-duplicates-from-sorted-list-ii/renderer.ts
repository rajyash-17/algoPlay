import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'sentinel',
  structures: [
    { name: 'sentinel', type: 'linked-list', label: 'Deduplicated List' },
  ],
  roleMappings: [
    { variable: 'pred', role: 'pointer', label: 'pred' },
    { variable: 'head', role: 'pointer', label: 'curr' },
  ],
};
