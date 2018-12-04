import { Stream } from 'xstream';
import { Sources as BaseSources, Sinks as BaseSinks } from '../../../../../interfaces';
import { Batch } from '../../Batch';
import { intent } from './intent';
import { router } from './router';
import { view } from './view';
import { Measure } from '../../../Product';

export type BatchWithMeasure = Batch & {
  measure: Measure;
};

export type State = BatchWithMeasure;
export type Sources = BaseSources<State>;
export type Sinks = BaseSinks<State>;

export function BatchListItem({ DOM, state }: Sources): Sinks {
  const batch$: Stream<BatchWithMeasure> = state.stream;
  const { navigateToBatch$ } = intent(batch$, DOM);
  return {
    DOM: view(batch$),
    router: router(navigateToBatch$)
  };
}
