import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'stack',
  structures: [
    { name: 'stack', type: 'stack', label: 'Values Stack' },
    { name: 'minStack', type: 'stack', label: 'Min-Tracking Stack' },
  ],
  roleMappings: [],
};
