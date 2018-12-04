import { createProduct } from '../Product';
import { ProductListItem } from './ProductListItem';
import {
  makeListComponent,
  State as ListState,
  Sources as ListSources,
  Sinks as ListSinks
} from '../../../shared/List';
import { ProductWithAggregatedBatchInfo } from './ProductListItem/component';

export type State = ListState<ProductWithAggregatedBatchInfo>;
export type Sources = ListSources<ProductWithAggregatedBatchInfo>;
export type Sinks = ListSinks<ProductWithAggregatedBatchInfo>;

export const ProductList = makeListComponent<ProductWithAggregatedBatchInfo>('product', ProductListItem, createProduct);
