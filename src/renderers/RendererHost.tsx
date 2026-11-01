'use client';

import React from 'react';
import { Step, RendererConfig } from '@/engine/types';
import { ArrayRenderer } from './ArrayRenderer';
import { LinkedListRenderer } from './LinkedListRenderer';
import { TreeRenderer } from './TreeRenderer';
import { StackQueueRenderer } from './StackQueueRenderer';
import { GridRenderer } from './GridRenderer';

interface RendererHostProps {
  step: Step | null;
  config: RendererConfig;
}

export const RendererHost: React.FC<RendererHostProps> = ({ step, config }) => {
  const primaryType = config.structures[0]?.type ?? 'array';

  switch (primaryType) {
    case 'grid':
      return <GridRenderer step={step} config={config} />;
    case 'linked-list':
      return <LinkedListRenderer step={step} config={config} />;
    case 'tree':
      return <TreeRenderer step={step} config={config} />;
    case 'stack':
    case 'queue':
      return <StackQueueRenderer step={step} config={config} />;
    case 'array':
    default:
      return <ArrayRenderer step={step} config={config} />;
  }
};
