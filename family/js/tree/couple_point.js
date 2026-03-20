import { $, bino } from '../chart.js';
import { TREE_BRANCH_COLOR } from '../settings.js';

// A small visual dot rendered at the junction between the couple and their
// children.  It acts as the GoJS root of the DoubleTreeLayout so that
// ancestors branch upward and kids branch downward.
export const CouplePointNode = () => {
  return $(
    bino.Node,
    { selectable: false },
    $(
      bino.Shape,
      'Circle',
      {
        width: 0,
        height: 0,
        fill: TREE_BRANCH_COLOR,
        stroke: null,
        strokeWidth: 0,
      }
    )
  );
};
