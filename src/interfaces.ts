import { Stream } from 'xstream';
import { DOMSource, VNode } from '@cycle/dom';
import { StateSource, Reducer } from '@cycle/state';
import { RouterSource, HistoryAction } from 'cyclic-router';

export { Reducer } from '@cycle/state';

export type Component<State> = (s: Sources<State>) => Sinks<State>;

export interface Sources<State> {
  state: StateSource<State>;
  DOM: DOMSource;
  router: RouterSource;
}

export interface Sinks<State> {
  state?: Stream<Reducer<State>>;
  DOM?: Stream<VNode>;
  router?: Stream<HistoryAction>;
}
