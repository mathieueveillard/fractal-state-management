import { Stream } from 'xstream';
import { DOMSource } from '@cycle/dom';
import { Measure } from '../Product';

export interface UpdateNameAction {
  type: 'UPDATE_NAME';
  name: string;
}

function makeUpdateNameAction(name: string): UpdateNameAction {
  return {
    type: 'UPDATE_NAME',
    name
  };
}

export interface UpdateMeasureAction {
  type: 'UPDATE_MEASURE';
  measure: Measure;
}

function makeUpdateMeasureAction(measure: Measure): UpdateMeasureAction {
  return {
    type: 'UPDATE_MEASURE',
    measure
  };
}

interface Actions {
  updateNameAction$: Stream<UpdateNameAction>;
  updateMeasureAction$: Stream<UpdateMeasureAction>;
}

export function intent(DOM: DOMSource): Actions {
  return {
    updateNameAction$: getUpdateTitleIntent(DOM),
    updateMeasureAction$: getUpdateMeasureAction(DOM)
  };
}

function getUpdateTitleIntent(DOM: DOMSource): Stream<UpdateNameAction> {
  return DOM.select('[data-action="updateTitle"]')
    .events('input')
    .map((event: any) => makeUpdateNameAction(event.target.value));
}

function getUpdateMeasureAction(DOM: DOMSource): Stream<UpdateMeasureAction> {
  return DOM.select('[data-action="updateMeasure"]')
    .events('click')
    .map((event: any) => makeUpdateMeasureAction(event.target.value));
}
