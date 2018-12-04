import { Stream } from 'xstream';
import { extractSinks } from 'cyclejs-utils';
import isolate from '@cycle/isolate';
import { driverNames } from '../../drivers';
import { Sources, Sinks, Reducer } from '../../interfaces';
import { Product, ProductList, ProductDetail } from './product';
import {
  makeChildSources,
  makeProductListChildState,
  makeProductDetailChildState,
  ChildState,
  reducer,
  makeBatchDetailChildState
} from './state';
import { Batch, BatchDetail } from './Batch';

export type State = {
  products: Product[];
  batches: Batch[];
};

interface RouteMatcherReturn {
  path: string;
  value: any;
}

export function App(sources: Sources<State>): Sinks<State> {
  const routeMatcherReturn$: Stream<RouteMatcherReturn> = sources.router.define({
    '/products': (_sources: Sources<State>) =>
      isolate(ProductList, 'productListScope')(makeChildSources(_sources, makeProductListChildState)),
    '/product/:id': (id: string) => (_sources: Sources<State>) =>
      isolate(ProductDetail, 'productDetailScope')(makeChildSources(_sources, makeProductDetailChildState(id))),
    '/batch/:id': (id: string) => (_sources: Sources<State>) =>
      isolate(BatchDetail, 'batchDetailScope')(makeChildSources(_sources, makeBatchDetailChildState(id)))
  });

  const componentSinks$: Stream<Sinks<ChildState>> = routeMatcherReturn$.map(({ path, value }: RouteMatcherReturn) => {
    return value({
      ...sources,
      router: sources.router.path(path)
    });
  });

  const { DOM, router, state } = extractSinks<Sinks<ChildState>>(componentSinks$, driverNames);

  const reducer$: Stream<Reducer<State>> = reducer(routeMatcherReturn$.map(extractPath), state);

  return {
    DOM,
    router,
    state: reducer$
  };
}

function extractPath({ path }: RouteMatcherReturn): string {
  return path;
}
