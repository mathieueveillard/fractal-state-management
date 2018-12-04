import Stream from 'xstream';
import { HistoryAction } from 'cyclic-router';
import { NavigateToBatchAction } from './intent';

export function router(navigateToBatch$: Stream<NavigateToBatchAction>): Stream<HistoryAction> {
  return navigateToBatch$.map(({ id }: NavigateToBatchAction) => `/batch/${id}`);
}
