import Stream from 'xstream';
import { DOMSource } from '@cycle/dom';
import { Batch } from '../../Batch';

export interface NavigateToBatchAction {
  type: 'NAVIGATE_TO_BATCH';
  id: string;
}

function makeNavigateToBatchAction(id: string): NavigateToBatchAction {
  return {
    type: 'NAVIGATE_TO_BATCH',
    id
  };
}

interface Actions {
  navigateToBatch$: Stream<NavigateToBatchAction>;
}

export function intent(product$: Stream<Batch>, DOM: DOMSource): Actions {
  const navigateToBatch$: Stream<NavigateToBatchAction> = product$
    .map(({ id }: Batch) =>
      DOM.select('[data-action="navigate"]')
        .events('click')
        .mapTo(makeNavigateToBatchAction(id))
    )
    .flatten();
  return {
    navigateToBatch$
  };
}
