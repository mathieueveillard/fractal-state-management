import xs, { Stream } from 'xstream';
import { Reducer } from '@cycle/state';
import { State } from './component';
import { UpdateQuantityAction, UpdateExpiryDateAction } from './intent';

export function reducer(
  updateQuantityAction$: Stream<UpdateQuantityAction>,
  updateExpiryDateAction$: Stream<UpdateExpiryDateAction>
): Stream<Reducer<State>> {
  return xs.merge(makeQuantityReducer(updateQuantityAction$), makeExpiryDateReducer(updateExpiryDateAction$));
}

function makeQuantityReducer(updateQuantityAction$: Stream<UpdateQuantityAction>): Stream<Reducer<State>> {
  return updateQuantityAction$.map(
    ({ quantity }: UpdateQuantityAction) =>
      function(batchWithProductData: State): State {
        return {
          ...batchWithProductData,
          quantity
        };
      }
  );
}

function makeExpiryDateReducer(updateExpiryDateAction$: Stream<UpdateExpiryDateAction>): Stream<Reducer<State>> {
  return updateExpiryDateAction$.map(
    ({ expiryDate }: UpdateExpiryDateAction) =>
      function(batchWithProductData: State): State {
        return {
          ...batchWithProductData,
          expiryDate
        };
      }
  );
}
