import { Stream } from 'xstream';
import { DOMSource } from '@cycle/dom';

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
  updateExpiryDateAction$: Stream<UpdateExpiryDateAction>;
}

export function intent(DOM: DOMSource): Actions {
  return {
    updateExpiryDateAction$: getUpdateExpiryDateIntent(DOM)
  };
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
