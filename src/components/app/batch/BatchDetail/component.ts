import { Stream } from 'xstream';
import { Sources as BaseSources, Sinks as BaseSinks } from '../../../../interfaces';
import { Batch } from '../Batch';
import { intent } from './intent';
import { reducer } from './state';
import { view } from './view';
import { Measure } from '../../Product/Product';

export type BatchWithProductData = Batch & {
  productName: string;
  measure: Measure;
};

export type State = BatchWithProductData;
export type Sources = BaseSources<State>;
export type Sinks = BaseSinks<State>;

export function BatchDetail({ DOM, state }: Sources): Sinks {
  const state$: Stream<State> = state.stream;
  const { updateExpiryDateAction$ } = intent(DOM);

  return {
    DOM: view(state$),
    state: reducer(updateExpiryDateAction$)
  };
}
