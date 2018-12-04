import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { BatchWithMeasure } from './component';
import { getUnitCorrespondingToMeasure, Measure } from '../../../Product';
import { computeDaysUntilExpiry, batchExpiresSoonOrHasExpired } from '../../Batch';

export function view(batch$: Stream<BatchWithMeasure>): Stream<VNode> {
  return batch$.map(({ id, quantity, measure, expiryDate }) => {
    return (
      <li className="batch-list-item mdl-cell mdl-cell--3-offset-desktop mdl-cell--6-col-desktop mdl-list__item mdl-list__item--two-line">
        <span data-action="navigate" className="mdl-list__item-primary-content">
          <i className="avatar material-icons mdl-list__item-avatar">layers</i>
          <span className="quantity-expiry">{`${makeQuantityString(quantity, measure)} ${makeExpirationString(
            expiryDate
          )}`}</span>
          <span className="id sub-title mdl-list__item-sub-title">{id}</span>
        </span>
        {!!expiryDate && batchExpiresSoonOrHasExpired(expiryDate) ? (
          <div className="warning">
            <i className="material-icons">error_outline</i>
          </div>
        ) : (
          undefined
        )}
      </li>
    );
  });
}

function makeQuantityString(quantity: number, measure: Measure): string {
  return `Quantity: ${quantity} ${getUnitCorrespondingToMeasure(measure)}`;
}

function makeExpirationString(expiryDate: Date | undefined): string {
  if (!expiryDate) {
    return ``;
  }
  const daysUntilExpiry: number = computeDaysUntilExpiry(expiryDate);
  if (daysUntilExpiry === 0) {
    return `| Expired`;
  }
  return `| Expires in ${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'}`;
}
