import Stream from 'xstream';
import { HistoryAction } from 'cyclic-router';
import { NavigateToProductAction } from './intent';

export function router(navigateToProduct$: Stream<NavigateToProductAction>): Stream<HistoryAction> {
  return navigateToProduct$.map(({ id }: NavigateToProductAction) => `/product/${id}`);
}
