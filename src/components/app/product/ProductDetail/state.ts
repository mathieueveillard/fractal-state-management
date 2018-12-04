import xs, { Stream } from 'xstream';
import { Reducer } from '@cycle/state';
import { State } from './component';
import { UpdateNameAction, UpdateMeasureAction } from './intent';
import { BatchWithMeasure } from '../../Batch/BatchList/BatchListItem';
import { Batch } from '../../Batch';

export function reducer(
  updateNameAction$: Stream<UpdateNameAction>,
  updateMeasureAction$: Stream<UpdateMeasureAction>,
  batchListStateSinks$: Stream<Reducer<BatchWithMeasure[]>>
): Stream<Reducer<State>> {
  return xs.merge(
    makeUpdateNameReducer(updateNameAction$),
    makeUpdateMeasureReducer(updateMeasureAction$),
    makeUpdateListOfBatchesReducer(batchListStateSinks$)
  );
}

function makeUpdateNameReducer(updateNameAction$: Stream<UpdateNameAction>): Stream<Reducer<State>> {
  return updateNameAction$.map(
    ({ name }: UpdateNameAction) =>
      function(state: State): State {
        return {
          ...state,
          product: {
            ...state.product,
            name
          }
        };
      }
  );
}

function makeUpdateMeasureReducer(updateMeasureAction$: Stream<UpdateMeasureAction>): Stream<Reducer<State>> {
  return updateMeasureAction$.map(
    ({ measure }: UpdateMeasureAction) =>
      function(state: State): State {
        return {
          ...state,
          product: {
            ...state.product,
            measure
          }
        };
      }
  );
}

function makeUpdateListOfBatchesReducer(
  batchListStateSinks$: Stream<Reducer<BatchWithMeasure[]>>
): Stream<Reducer<State>> {
  return batchListStateSinks$.map(
    (batchListReducer: Reducer<BatchWithMeasure[]>) =>
      function(state: State): State {
        const batchListChildState: BatchWithMeasure[] = makeBatchListChildState(state);
        const batches: Batch[] = batchListReducer(batchListChildState)!.map(removeMeasureAttributeFromBatchWithMeasure);
        return {
          ...state,
          batches
        };
      }
  );
}

export function makeBatchListChildState({ product: { measure }, batches }: State): BatchWithMeasure[] {
  return batches.map((batch: Batch) => ({
    ...batch,
    measure
  }));
}

function removeMeasureAttributeFromBatchWithMeasure(batchWithMeasure: BatchWithMeasure): Batch {
  const batch: BatchWithMeasure = { ...batchWithMeasure };
  delete batch.measure;
  return batch;
}
