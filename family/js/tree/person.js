import { $, bino } from '../chart.js';
import {
  TREE_BACKGROUND_COLOR,
  TREE_NODE_BACKGROUND_COLOR,
  TREE_NODE_WIDTHS_BY_GENERATION,
} from '../settings.js';
import { cursorBinding } from './bindings.js';

export const TopLeftBorderRadius = () => {
  return $(
    bino.Shape, 'TopLeftBorderRadius',
    {
      fill: TREE_BACKGROUND_COLOR,
      stroke: null,
      margin: new bino.Margin(0, 0, 0, 0),
      strokeWidth: 0,
    }
  );
};

export const BottomLeftBorderRadius = () => {
  return $(
    bino.Shape, 'BottomLeftBorderRadius',
    {
      fill: TREE_BACKGROUND_COLOR,
      stroke: null,
      strokeWidth: 0,
    },
    new bino.Binding("margin", '', (nodeData) => {
      return new bino.Margin(nodeData.height - 5.8, 0, 0, 0);
    }),
  );
};

export const BaseNodeContainer = () => {
  return $(
    bino.Panel,
    $(
      bino.Shape,
      {
        figure: 'RoundedRectangle',
        fill: TREE_NODE_BACKGROUND_COLOR,
        stroke: TREE_NODE_BACKGROUND_COLOR,
        strokeWidth: 1,
      },
      cursorBinding(),
      new bino.Binding('desiredSize', '', (nodeData) => {
        return new bino.Size(TREE_NODE_WIDTHS_BY_GENERATION[nodeData.generation], nodeData.height);
      }),
    ),
  );
};
