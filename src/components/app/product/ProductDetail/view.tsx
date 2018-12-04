import xs, { Stream } from 'xstream';
import { Product, Measure, measureToString } from '../Product';
import { VNode } from '@cycle/dom';
import { upgradeElement } from '../../../../util';
import * as uuid from 'uuid/v4';

const NAME_PLACEHOLDER = "Product's name";

export function view(product$: Stream<Product>, batchListDomSinks$: Stream<VNode>): Stream<VNode> {
  return xs.combine(product$, batchListDomSinks$).map(makeView);
}

function makeView([product, batchListDomSinks]: [Product, VNode]): VNode {
  return (
    <div className="product-detail">
      <div className="product-detail-content">
        {makeProductDataView(product)}
        {makeBatchListView(batchListDomSinks)}
      </div>
    </div>
  );
}

function makeProductDataView({ name, measure }: Product): VNode {
  return (
    <div className="mdl-grid mdl-list">
      {makeProductDataNameView(name)}
      {makeProductDataMeasureView(measure)}
    </div>
  );
}

function makeProductDataNameView(name: string): VNode {
  return (
    <div className="mdl-cell mdl-cell--3-offset-desktop mdl-cell--6-col-desktop">
      <div
        className="name-container mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
        hook-insert={upgradeElement}
      >
        <input data-action="updateTitle" className="name mdl-textfield__input" type="text" id="name" value={name} />
        <label className="mdl-textfield__label" for="name">
          {NAME_PLACEHOLDER}
        </label>
      </div>
    </div>
  );
}

function makeProductDataMeasureView(measure: Measure): VNode {
  return (
    <div className="mdl-cell mdl-cell--3-offset-desktop mdl-cell--6-col-desktop">
      <div className="measure-container">
        {makeMeasureOption('UNITS', measure === 'UNITS')}
        {makeMeasureOption('WEIGHT_IN_KG', measure === 'WEIGHT_IN_KG')}
      </div>
    </div>
  );
}

function makeMeasureOption(measure: Measure, checked: boolean): VNode {
  const id: string = uuid();
  return (
    <label className="measure-option mdl-radio mdl-js-radio mdl-js-ripple-effect" for={id} hook-insert={upgradeElement}>
      <input
        type="radio"
        id={id}
        className="mdl-radio__button"
        name="measure"
        data-action="updateMeasure"
        value={measure}
        checked={checked}
      />
      <span className="mdl-radio__label">{measureToString(measure)}</span>
    </label>
  );
}

function makeBatchListView(batchListDomSinks: VNode): VNode {
  return batchListDomSinks;
}
