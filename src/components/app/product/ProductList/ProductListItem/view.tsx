import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { ProductWithAggregatedBatchInfo } from './component';
import { getUnitCorrespondingToMeasure } from '../../Product';

const NO_NAME = '[No name]';

export function view(product$: Stream<ProductWithAggregatedBatchInfo>): Stream<VNode> {
  return product$.map(({ name, totalQuantity, measure, aBatchExpiresSoon }) => (
    <li className="product-list-item mdl-cell mdl-cell--3-offset-desktop mdl-cell--6-col-desktop mdl-list__item mdl-list__item--two-line">
      <span data-action="navigate" className="mdl-list__item-primary-content">
        <i className="avatar material-icons mdl-list__item-avatar">restaurant</i>
        <span className="title">{name || NO_NAME}</span>
        <span className="sub-title mdl-list__item-sub-title">{`Quantity: ${totalQuantity} ${getUnitCorrespondingToMeasure(
          measure
        )}`}</span>
      </span>
      {aBatchExpiresSoon ? (
        <div className="warning">
          <i className="material-icons">error_outline</i>
        </div>
      ) : (
        undefined
      )}
    </li>
  ));
}
