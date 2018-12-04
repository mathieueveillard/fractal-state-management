import * as uuid from 'uuid/v4';

export type Measure = 'UNITS' | 'WEIGHT_IN_KG';

function makeErrorUnknownMeasure(measure: Measure): Error {
  return new Error(`Error: expected a Measure but received ${measure}`);
}

export interface Product {
  id: string;
  name: string;
  measure: Measure;
}

export function createProduct(): Product {
  return {
    id: uuid(),
    name: '',
    measure: 'UNITS'
  };
}

export function measureToString(measure: Measure): string {
  switch (measure) {
    case 'UNITS':
      return 'Units';
    case 'WEIGHT_IN_KG':
      return 'Weight (kg)';
    default:
      throw makeErrorUnknownMeasure(measure);
  }
}

export function getUnitCorrespondingToMeasure(measure: Measure): string {
  switch (measure) {
    case 'UNITS':
      return '';
    case 'WEIGHT_IN_KG':
      return 'kg';
    default:
      throw makeErrorUnknownMeasure(measure);
  }
}
