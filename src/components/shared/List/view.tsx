import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { upgradeElement } from '../../../util';

export function view(entityName: string, listItemsDomSinks$: Stream<VNode[]>): Stream<VNode> {
  return listItemsDomSinks$.map(makeView(entityName));
}

function makeView(entityName: string): (listItemsDomSinks: VNode[]) => VNode {
  return function(listItemsDomSinks: VNode[]): VNode {
    return (
      <div className={`${entityName}-list`}>
        <div className={`${entityName}-list-content`}>
          <div className="mdl-grid mdl-list">
            <div className="mdl-cell mdl-cell--3-offset-desktop mdl-cell--6-col-desktop">
              <button
                data-action="addEntity"
                className="add mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                hook-insert={upgradeElement}
              >
                {`Add ${entityName}`}
              </button>
            </div>
          </div>
          <ul className="mdl-grid mdl-list">{listItemsDomSinks}</ul>
        </div>
      </div>
    );
  };
}
