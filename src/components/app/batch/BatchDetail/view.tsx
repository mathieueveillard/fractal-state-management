import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { upgradeElement } from '../../../../util';
import { State, BatchWithProductData } from './component';
import { DateTime } from 'luxon';

const EXPIRY_DATE_PLACEHOLDER = 'Expiry date (YYYY-MM-DD)';

export function view(state$: Stream<State>): Stream<VNode> {
  return state$.map((batchWithProductData: BatchWithProductData) => (
    <div className="batch-detail">
      <div className="batch-detail-content">
        {makeBatchTitleView(batchWithProductData)}
        {makeBatchEditView(batchWithProductData)}
      </div>
    </div>
  ));
}

function makeBatchTitleView({ id, productName }: BatchWithProductData): VNode {
  return (
    <div className="mdl-cell mdl-cell--3-offset-desktop mdl-cell--6-col-desktop">
      <h1>{productName}</h1>
      <div>{id}</div>
    </div>
  );
}

function makeBatchEditView({ expiryDate }: BatchWithProductData): VNode {
  return <div className="content mdl-grid mdl-list">{makeExpiryDateInput(expiryDate)}</div>;
}

function makeExpiryDateInput(expiryDate: Date | undefined): VNode {
  return (
    <div className="mdl-cell mdl-cell--3-offset-desktop mdl-cell--6-col-desktop">
      <div
        className="expiry-date-container mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
        hook-insert={upgradeElement}
      >
        <input
          data-action="updateExpiryDate"
          className="expiry-date mdl-textfield__input"
          type="text"
          id="expiry-date"
          value={expiryDate ? formatDate(expiryDate) : undefined}
          pattern="([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))"
        />
        <label className="mdl-textfield__label" for="expiry-date">
          {EXPIRY_DATE_PLACEHOLDER}
        </label>
        <span className="mdl-textfield__error">Date must match the "YYYY-MM-DD" pattern</span>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  const dateTime: DateTime = DateTime.fromJSDate(date);
  return dateTime.toFormat('yyyy-MM-dd');
}
