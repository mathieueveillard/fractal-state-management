import xs, { Stream } from 'xstream';
import { Entity } from './component';
import delay from 'xstream/extra/delay';
import { HistoryAction } from 'cyclic-router';

export function router<T extends Entity>(
  entityName: string,
  listItemsRouterSinks$: Stream<HistoryAction>,
  newentity$: Stream<T>
): Stream<HistoryAction> {
  return xs.merge(listItemsRouterSinks$, newentity$.compose(delay(10)).map(({ id }: T) => `/${entityName}/${id}`));
}
