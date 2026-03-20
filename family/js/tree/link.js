import { $, bino } from '../chart.js';
import { TREE_BRANCH_COLOR } from '../settings.js';

export const TreeBranch = () => {
  return $(
    bino.Link,
    {
      selectable: false,
      routing: bino.Link.Orthogonal,
    },
    $(
      bino.Shape,
      {
        stroke: TREE_BRANCH_COLOR,
        strokeWidth: 1,
      },
    ),
  );
}
