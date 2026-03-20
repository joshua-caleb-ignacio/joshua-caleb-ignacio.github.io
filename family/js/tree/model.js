import { $, bino } from '../chart.js';

export const TreeModel = () => {
  let model = $(bino.TreeModel);
  model.nodeDataArray = TREE_DATA;
  return model;
};
