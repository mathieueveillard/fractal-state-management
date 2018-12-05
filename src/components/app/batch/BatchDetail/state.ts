import { Stream } from 'xstream';
import { Reducer } from '@cycle/state';
import { State } from './component';
import { UpdateExpiryDateAction } from './intent';

export function reducer(updateExpiryDateAction$: Stream<UpdateExpiryDateAction>): Stream<Reducer<State>> {
  return makeExpiryDateReducer(updateExpiryDateAction$);
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
