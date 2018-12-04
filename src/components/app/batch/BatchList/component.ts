import { Batch, createBatch } from '../Batch';
import { BatchListItem, BatchWithMeasure } from './BatchListItem';
import {
  makeListComponent,
  State as ListState,
  Sources as ListSources,
  Sinks as ListSinks
} from '../../../shared/List';
import { Component } from '../../../../interfaces';
import { Measure } from '../../product';

export type State = ListState<BatchWithMeasure>;
export type Sources = ListSources<BatchWithMeasure>;
export type Sinks = ListSinks<BatchWithMeasure>;

export function makeBatchListComponent(productId: string, measure: Measure): Component<BatchWithMeasure[]> {
  return makeListComponent<BatchWithMeasure>('batch', BatchListItem, createBatchWithMeasure(productId, measure));
}

function createBatchWithMeasure(productId: string, measure: Measure): () => BatchWithMeasure {
  return () => ({
    ...createBatch(productId),
    measure
  });
}
