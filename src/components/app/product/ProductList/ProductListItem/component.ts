import { Stream } from 'xstream';
import { Sources as BaseSources, Sinks as BaseSinks } from '../../../../../interfaces';
import { Product } from '../../Product';
import { intent } from './intent';
import { router } from './router';
import { view } from './view';

export type ProductWithAggregatedBatchInfo = Product & {
  totalQuantity: number;
  aBatchExpiresSoon: boolean;
};

export type State = ProductWithAggregatedBatchInfo;
export type Sources = BaseSources<State>;
export type Sinks = BaseSinks<State>;

export function ProductListItem({ DOM, state }: Sources): Sinks {
  const product$: Stream<ProductWithAggregatedBatchInfo> = state.stream;
  const { navigateToProduct$ } = intent(product$, DOM);
  return {
    DOM: view(product$),
    router: router(navigateToProduct$)
  };
}
