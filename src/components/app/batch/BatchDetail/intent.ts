import { Stream } from 'xstream';
import { DOMSource } from '@cycle/dom';

export interface UpdateQuantityAction {
  type: 'UPDATE_QUANTITY';
  quantity: number;
}

function makeUpdateQuantityAction(quantity: number): UpdateQuantityAction {
  return {
    type: 'UPDATE_QUANTITY',
    quantity
  };
}

export interface UpdateExpiryDateAction {
  type: 'UPDATE_EXPIRY_DATE';
  expiryDate: Date;
}

function makeUpdateExpiryDateAction(expiryDate: Date): UpdateExpiryDateAction {
  return {
    type: 'UPDATE_EXPIRY_DATE',
    expiryDate
  };
}

interface Actions {
  updateQuantityAction$: Stream<UpdateQuantityAction>;
  updateExpiryDateAction$: Stream<UpdateExpiryDateAction>;
}

export function intent(DOM: DOMSource): Actions {
  return {
    updateQuantityAction$: getUpdateQuantityIntent(DOM),
    updateExpiryDateAction$: getUpdateExpiryDateIntent(DOM)
  };
}

function getUpdateQuantityIntent(DOM: DOMSource): Stream<UpdateQuantityAction> {
  return DOM.select('[data-action="updateQuantity"]')
    .events('input')
    .map((event: any) => makeUpdateQuantityAction(event.target.value));
}

function getUpdateExpiryDateIntent(DOM: DOMSource): Stream<UpdateExpiryDateAction> {
  return DOM.select('[data-action="updateExpiryDate"]')
    .events('input')
    .map((event: any) => event.target.value)
    .filter(isValidDate)
    .map(inputToDate)
    .map(makeUpdateExpiryDateAction);
}

function isValidDate(input: string): boolean {
  const regex: RegExp = new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
  return regex.test(input);
}

function inputToDate(input: string): Date {
  const [year, month, day] = input.split('-').map((s: string) => parseInt(s, 10));
  return new Date(year, month - 1, day);
}
