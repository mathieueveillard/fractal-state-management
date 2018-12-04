import { Stream } from 'xstream';
import { Reducer } from '@cycle/state';
import { Entity, State } from './component';

export function reducer<T extends Entity>(newEntity$: Stream<T>): Stream<Reducer<State<T>>> {
  return newEntity$.map(
    (entity: T) =>
      function(entities: State<T>): State<T> {
        return [...entities, entity];
      }
  );
}
