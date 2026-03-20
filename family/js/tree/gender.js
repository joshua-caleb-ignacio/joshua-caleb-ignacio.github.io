import { $, bino } from '../chart.js';
import {
  FEMALE_COLOR,
  MALE_COLOR,
  TREE_NODE_BASE_HEIGHT,
  TREE_NODE_GENDER_BAND_WIDTH,
} from '../settings.js';

export const GenderBand = () => {
  return $(
    bino.Shape,
    {
      margin: new bino.Margin(0, 0, 0, TREE_NODE_BASE_HEIGHT - 1),
      figure: "Rectangle",
      stroke: null,
      strokeWidth: 0,
    },
    new bino.Binding("desiredSize", '', function(nodeData) {
      return new bino.Size(TREE_NODE_GENDER_BAND_WIDTH, nodeData.height);
    }),
    new bino.Binding("fill", '', function(nodeData) {
      return nodeData.gender.toUpperCase() == 'M' ? MALE_COLOR : FEMALE_COLOR;
    })
  );
}
