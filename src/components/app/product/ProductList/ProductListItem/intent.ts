import Stream from 'xstream';
import { DOMSource } from '@cycle/dom';
import { Product } from '../../Product';

export interface NavigateToProductAction {
  type: 'NAVIGATE_TO_PRODUCT';
  id: string;
}

function makeNavigateToProductAction(id: string): NavigateToProductAction {
  return {
    type: 'NAVIGATE_TO_PRODUCT',
    id
  };
}

interface Actions {
  navigateToProduct$: Stream<NavigateToProductAction>;
}

export function intent(product$: Stream<Product>, DOM: DOMSource): Actions {
  const navigateToProduct$: Stream<NavigateToProductAction> = product$
    .map(({ id }: Product) =>
      DOM.select('[data-action="navigate"]')
        .events('click')
        .mapTo(makeNavigateToProductAction(id))
    )
    .flatten();
  return {
    navigateToProduct$
  };
}
