import { RendererConfig } from '@/engine/types';

export const rendererConfig: RendererConfig = {
  primaryStructure: 'prices',
  structures: [
    { name: 'prices', type: 'array', label: 'Stock Prices' },
  ],
  roleMappings: [
    { variable: 'buyDay', role: 'pointer', label: 'buy' },
    { variable: 'day', role: 'pointer', label: 'day' },
  ],
};
