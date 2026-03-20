import { $, bino } from '../chart.js';
import {
  DEFAULT_FEMALE_PHOTO,
  DEFAULT_MALE_PHOTO,
  EMPTY_PHOTO,
} from '../assets.js';
import { TREE_NODE_BASE_HEIGHT } from '../settings.js';
import { cursorBinding } from './bindings.js';

export const Photo = () => {
  return $(
    bino.Panel,
    'Spot',
    {
      isClipping: true,
      margin: new bino.Margin(0.2, 0, 0, 0.2),
      cursor: "pointer",
    },
    cursorBinding(),
    $(
      bino.Shape,
      'Rectangle',
      {
        width: TREE_NODE_BASE_HEIGHT - 0.4,
        stroke: null,
        strokeWidth: 0,
      },
      new bino.Binding('height', '', function(nodeData) {
        return nodeData.height - 0.4;
      }),
    ),
    $(
      bino.Picture,
      {
        margin: new bino.Margin(0.2, 0, 0, 0.2),
      },
      new bino.Binding('imageStretch', '', function(nodeData) {
        if (nodeData.useNonePhoto) {
          return bino.GraphObject.Fill;
        }
        return bino.GraphObject.UniformToFill;
      }),
      new bino.Binding('scale', '', function(nodeData) {
        return nodeData.photoScale;
      }),
      new bino.Binding('source', '', function(nodeData) {
        if (nodeData.useNonePhoto) {
          return EMPTY_PHOTO;
        }
        if (nodeData.hasImage && nodeData.fid !== undefined) {
          return 'images/people/' + nodeData.fid + '.lossy.webp';
        }
        if (nodeData.gender.toUpperCase() == 'M') {
          return DEFAULT_MALE_PHOTO;
        }
        return DEFAULT_FEMALE_PHOTO;
      })
    ),
  );
}
