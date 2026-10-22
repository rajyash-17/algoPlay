import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'chars',
  structures: [
    { name: 'chars', type: 'array', label: 'Cleaned Characters' },
  ],
  roleMappings: [
    { variable: 'left', role: 'pointer', label: 'left' },
    { variable: 'right', role: 'pointer', label: 'right' },
  ],
};
