import xs, { Stream } from 'xstream';
import { MockTimeSource, mockTimeSource } from '@cycle/time';
import { DOMSource, mockDOMSource, VNode } from '@cycle/dom';
import { HistoryAction } from 'cyclic-router';
import { Product } from '../../Product';
import { ProductListItem, Sinks, Sources, ProductWithAggregatedBatchInfo } from './component';

describe('ProductListItem', () => {
  it('should display DOM as per the Product provided as state', done => {
    // GIVEN
    const time: MockTimeSource = mockTimeSource();
    const DOM: DOMSource = mockDOMSource({});
    const product: ProductWithAggregatedBatchInfo = {
      id: 'aef3c8a3-65ef-4242-8ac7-0d329ba6931e',
      name: '',
      measure: 'WEIGHT_IN_KG',
      totalQuantity: 15,
      aBatchExpiresSoon: true
    };

    // WHEN
    const sinks: Sinks = ProductListItem({ DOM, state: { stream: xs.of(product) } } as Sources);
    const actual$: Stream<VNode> = sinks.DOM!;

    // THEN
    const expectedValue: VNode = (
      <li className="product-list-item mdl-cell mdl-cell--3-offset-desktop mdl-cell--6-col-desktop mdl-list__item mdl-list__item--two-line">
        <span data-action="navigate" className="mdl-list__item-primary-content">
          <i className="avatar material-icons mdl-list__item-avatar">restaurant</i>
          <span className="title">[No name]</span>
          <span className="sub-title mdl-list__item-sub-title">Quantity: 15 kg</span>
        </span>
        <div className="warning">
          <i className="material-icons">error_outline</i>
        </div>
      </li>
    );
    const expected$: Stream<VNode> = time.diagram('(e|)', { e: expectedValue });
    time.assertEqual(actual$, expected$);
    time.run(done);
  });

  it('should update route when the user clicks on the product', done => {
    // GIVEN
    const time: MockTimeSource = mockTimeSource();
    const navigate$ = time.diagram('--x---------');
    const DOM: DOMSource = mockDOMSource({
      '[data-action="navigate"]': { click: navigate$ }
    });
    const product: ProductWithAggregatedBatchInfo = {
      id: 'aef3c8a3-65ef-4242-8ac7-0d329ba6931e',
      name: 'Product',
      measure: 'UNITS',
      totalQuantity: 100,
      aBatchExpiresSoon: false
    };

    // WHEN
    // @ts-ignore
    const sinks: Sinks = ProductListItem({ DOM, state: { stream: xs.of(product) } } as Sources);
    const actual$: Stream<HistoryAction> = sinks.router!;

    // THEN
    const expectedValue: HistoryAction = '/product/aef3c8a3-65ef-4242-8ac7-0d329ba6931e';
    const expected$: Stream<HistoryAction> = time.diagram('--e---------', {
      e: expectedValue
    });
    time.assertEqual(actual$, expected$);
    time.run(done);
  });
});
