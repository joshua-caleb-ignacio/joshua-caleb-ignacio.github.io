import { bino } from '../chart.js';
import {
  IS_PRIVATE,
  TREE_NODE_WIDTHS_BY_GENERATION,
} from '../settings.js';

// Returns the appropriate cursor based on whether this person's data is private.
export const cursorBinding = () =>
  new bino.Binding('cursor', '', (nodeData) =>
    (nodeData.living && IS_PRIVATE) ? "default" : "pointer"
  );

// Returns the text width for name and date rows (standard left offset).
export const textWidthBinding = () =>
  new bino.Binding('width', '', (nodeData) =>
    (TREE_NODE_WIDTHS_BY_GENERATION[nodeData.generation] - 94) - 15
  );

// Returns the text width for place value text (wider left offset for the letter prefix).
export const placeValueWidthBinding = () =>
  new bino.Binding('width', '', (nodeData) =>
    (TREE_NODE_WIDTHS_BY_GENERATION[nodeData.generation] - 94) - 33
  );
