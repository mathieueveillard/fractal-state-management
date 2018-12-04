import { Stream } from 'xstream';
import { Sources as BaseSources, Sinks as BaseSinks, Component } from '../../../interfaces';
import { makeCollection, Instances } from '@cycle/state';
import { intent } from './intent';
import { router } from './router';
import { view } from './view';
import { reducer } from './state';

export interface Entity {
  id: string;
}

export type State<T extends Entity> = T[];
export type Sources<T extends Entity> = BaseSources<State<T>>;
export type Sinks<T extends Entity> = BaseSinks<State<T>>;

export type ListItemComponent<T extends Entity> = Component<T>;

export function makeListComponent<T extends Entity>(
  entityName: string,
  item: ListItemComponent<T>,
  createEntity: () => Entity
): Component<State<T>> {
  return function List(sources: Sources<T>): Sinks<T> {
    const CollectionComponent = makeCollectionComponent(item);
    const listItemSinks = CollectionComponent(sources);
    const { addEntityAction$ } = intent(sources.DOM);
    const newEntity$: Stream<T> = addEntityAction$.map(createEntity as () => T);
    return {
      DOM: view(entityName, listItemSinks.DOM),
      router: router<T>(entityName, listItemSinks.router, newEntity$),
      state: reducer<T>(newEntity$)
    };
  };
}

function makeCollectionComponent<T extends Entity>(item: ListItemComponent<T>): any {
  return makeCollection({
    item,
    itemKey: (_, index: number) => String(index),
    itemScope: (key: string) => key,
    collectSinks: (instances: Instances<T>) => ({
      DOM: instances.pickCombine('DOM'),
      router: instances.pickMerge('router')
    })
  });
}
