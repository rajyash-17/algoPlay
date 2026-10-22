import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'head',
  structures: [
    { name: 'head', type: 'linked-list', label: 'LRU Cache List' },
  ],
  roleMappings: [],
};
