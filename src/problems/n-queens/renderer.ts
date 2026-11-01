import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'board',
  structures: [
    { name: 'board', type: 'grid', label: 'Chessboard' },
  ],
  roleMappings: [
    { variable: 'row', role: 'pointer', label: 'row' },
    { variable: 'col', role: 'pointer', label: 'col' },
  ],
};
