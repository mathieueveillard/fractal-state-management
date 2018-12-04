import xs, { Stream } from 'xstream';
import { Sources } from '../../interfaces';
import { State } from './component';
import { StateSource, Reducer } from '@cycle/state';
import { ProductListState, ProductDetailState, Product } from './Product';
import { INITIAL_STATE } from './initialState';
import { Batch, BatchDetailState, batchExpiresSoonOrHasExpired } from './Batch';
import { BatchWithProductData } from './Batch/BatchDetail';
import { upsertMany } from '../../util';
import { ProductWithAggregatedBatchInfo } from './Product/ProductList/ProductListItem/component';

interface ProductListChildState {
  productListScope: ProductListState;
}

interface ProductDetailChildState {
  productDetailScope: ProductDetailState;
}

interface BatchDetailChildState {
  batchDetailScope: BatchDetailState;
}

export type ChildState = ProductListChildState | ProductDetailChildState;

export function makeChildSources<T>(sources: Sources<State>, makeIsolatedChildState: (state: State) => T): Sources<T> {
  return {
    ...sources,
    state: new StateSource(sources.state.stream.map(makeIsolatedChildState), '')
  };
}

export function makeProductListChildState({ products, batches }: State): ProductListChildState {
  const productsWithAggregatedBatchInfo: ProductWithAggregatedBatchInfo[] = products.map((product: Product) =>
    enhanceProductWithAggregatedBatchInfo(product, batches)
  );
  return {
    productListScope: productsWithAggregatedBatchInfo
  };
}

function enhanceProductWithAggregatedBatchInfo(product: Product, batches: Batch[]): ProductWithAggregatedBatchInfo {
  const { id } = product;
  const productBatches: Batch[] = getBatchesRelativeToProduct(batches, id);
  return {
    ...product,
    totalQuantity: computeTotalQuantity(productBatches),
    aBatchExpiresSoon: computeIfABatchExpiresSoon(productBatches)
  };
}

function getBatchesRelativeToProduct(batches: Batch[], productIdToMatch: string): Batch[] {
  return batches.filter(({ productId }: Batch) => productId === productIdToMatch);
}

function computeTotalQuantity(batches: Batch[]): number {
  return batches.reduce((accumulator: number, { quantity }: Batch) => accumulator + quantity, 0);
}

function computeIfABatchExpiresSoon(batches: Batch[]): boolean {
  return batches.reduce(
    (accumulator: boolean, { expiryDate }: Batch) =>
      accumulator || (!!expiryDate && batchExpiresSoonOrHasExpired(expiryDate)),
    false
  );
}

export function makeProductDetailChildState(productId: string): (state: State) => ProductDetailChildState {
  return function(state: State): ProductDetailChildState {
    const product: Product = getProductFromState(state, productId);
    const productBatches: Batch[] = getBatchesRelativeToProduct(state.batches, productId);
    return {
      productDetailScope: {
        product,
        batches: productBatches
      }
    };
  };
}

export function makeBatchDetailChildState(batchId: string): (state: State) => BatchDetailChildState {
  return function(state: State): BatchDetailChildState {
    const batch: Batch = getSingleBatchFromState(state, batchId);
    const { name, measure }: Product = getProductFromState(state, batch.productId);
    return {
      batchDetailScope: {
        ...batch,
        productName: name,
        measure
      }
    };
  };
}

function getProductFromState({ products }: State, productId: string): Product {
  const product: Product | undefined = products.find(({ id }: Product) => id === productId);
  if (!product) {
    throw Error(`There is no Product with id ${productId}`);
  }
  return product;
}

function getSingleBatchFromState({ batches }: State, batchId: string): Batch {
  const batch: Batch | undefined = batches.find(({ id }: Batch) => id === batchId);
  if (!batch) {
    throw Error(`There is no Batch with id ${batchId}`);
  }
  return batch;
}

export function reducer(path$: Stream<string>, childReducer$: Stream<Reducer<ChildState>>): Stream<Reducer<State>> {
  const initialReducer$: Stream<Reducer<State>> = xs.of(() => INITIAL_STATE);

  const reducerFromChildReducer$: Stream<Reducer<State>> = path$
    .map((path: string) => {
      return childReducer$.map((childReducer: Reducer<ChildState>) => (_state: State) => {
        switch (routeMatches(path)) {
          case 'ProductList':
            return makeStateFromProductListReducer(_state, childReducer as Reducer<ProductListChildState>);
          case 'ProductDetailAndBatchesList': {
            const productId: string = extractIdFromPath(path);
            return makeStateFromProductDetailReducer(_state, productId, childReducer as Reducer<
              ProductDetailChildState
            >);
          }
          case 'BatchDetail': {
            const batchId: string = extractIdFromPath(path);
            return makeStateFromBatchDetailReducer(_state, batchId, childReducer as Reducer<BatchDetailChildState>);
          }
          default:
            return _state;
        }
      });
    })
    .flatten();

  return xs.merge(initialReducer$, reducerFromChildReducer$);
}

function routeMatches(path: string): 'ProductList' | 'ProductDetailAndBatchesList' | 'BatchDetail' {
  const root: string = path.split('/')[1];
  switch (root) {
    case 'products':
      return 'ProductList';
    case 'product':
      return 'ProductDetailAndBatchesList';
    case 'batch':
      return 'BatchDetail';
    default:
      throw new Error(`Error: expected path but received ${path}`);
  }
}

function extractIdFromPath(path: string): string {
  const id: string | undefined = path.split('/')[2];
  if (!id) {
    throw new Error(`Error: path ${path} doesn't contain any id`);
  }
  return id;
}

function makeStateFromProductListReducer(state: State, productListReducer: Reducer<ProductListChildState>): State {
  const childState: ProductListChildState = makeProductListChildState(state);
  return {
    ...state,
    products: productListReducer(childState)!.productListScope
  };
}

function makeStateFromProductDetailReducer(
  state: State,
  id: string,
  productDetailReducer: Reducer<ProductDetailChildState>
): State {
  const childState: ProductDetailChildState = makeProductDetailChildState(id)(state);
  const updatedChildState: ProductDetailChildState = productDetailReducer(childState)!;
  const products: Product[] = state.products.map((product: Product) => {
    if (product.id !== id) {
      return product;
    }
    return updatedChildState.productDetailScope.product;
  });
  const batches: Batch[] = upsertMany(state.batches, updatedChildState.productDetailScope.batches);
  return {
    ...state,
    products,
    batches
  };
}

function makeStateFromBatchDetailReducer(
  state: State,
  batchId: string,
  batchDetailReducer: Reducer<BatchDetailChildState>
): State {
  const batches: Batch[] = state.batches.map((batch: Batch) => {
    if (batch.id !== batchId) {
      return batch;
    }
    const childState: BatchDetailChildState = makeBatchDetailChildState(batchId)(state);
    const { id, productId, quantity, expiryDate }: BatchWithProductData = batchDetailReducer(
      childState
    )!.batchDetailScope;
    return {
      id,
      productId,
      quantity,
      expiryDate
    };
  });
  return {
    ...state,
    batches
  };
}
