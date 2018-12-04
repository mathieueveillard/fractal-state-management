import * as uuid from 'uuid/v4';
import { Interval } from 'luxon';

const CRITICALITY_DELAY_IN_DAYS: number = 10;

export interface Batch {
  id: string;
  productId: string;
  quantity: number;
  expiryDate?: Date;
}

export function createBatch(productId: string): Batch {
  return {
    id: uuid(),
    productId,
    quantity: 0
  };
}

export function computeDaysUntilExpiry(expiryDate: Date): number {
  const duration: Interval = Interval.fromDateTimes(new Date(), expiryDate);
  const days: number = duration.length('day') || 0;
  return Math.ceil(days);
}

export function batchExpiresSoonOrHasExpired(expiryDate: Date): boolean {
  return computeDaysUntilExpiry(expiryDate) <= CRITICALITY_DELAY_IN_DAYS;
}
