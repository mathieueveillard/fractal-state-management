import { Stream } from 'xstream';
import { DOMSource } from '@cycle/dom';

export interface AddEntityAction {
  type: 'ADD_ENTITY';
}

function makeAddEntityAction(): AddEntityAction {
  return {
    type: 'ADD_ENTITY'
  };
}

interface Actions {
  addEntityAction$: Stream<AddEntityAction>;
}

export function intent(DOM: DOMSource): Actions {
  return {
    addEntityAction$: DOM.select('[data-action="addEntity"]')
      .events('click')
      .mapTo(makeAddEntityAction())
  };
}
