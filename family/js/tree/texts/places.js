import { $, bino } from '../../chart.js';
import {
  TREE_NODE_BASE_HEIGHT,
  TREE_NODE_PADDING,
  TREE_TEXTS_DETAILS_FONT_SIZE,
  TREE_TEXTS_DETAILS_LETTER_COLOR,
  TREE_TEXTS_DETAILS_TEXT_COLOR,
  TREE_TEXTS_NAMELESS_DETAILS_COLOR,
} from '../../settings.js';
import { cursorBinding, textWidthBinding, placeValueWidthBinding } from '../bindings.js';

const BASE_TOP_MARGINS = { 2: 39, 3: 54.5, 4: 70 };

const PlacesText = (index) => {
  if (index < 2 || index > 4) {
    throw new Error('Index should only be from 2 to 4!');
  }

  const baseTopMargin = BASE_TOP_MARGINS[index];

  return $(bino.Panel,
    $(
      bino.TextBlock,
      {
        font: `400 ${TREE_TEXTS_DETAILS_FONT_SIZE}px "Google Sans Text", sans-serif`,
        height: TREE_TEXTS_DETAILS_FONT_SIZE + 2,
      },
      cursorBinding(),
      placeValueWidthBinding(),
      new bino.Binding("margin", '', function(nodeData) {
        let marginAdder = (nodeData.detailsRow2.letter == 'M' || nodeData.detailsRow3.letter == 'M') ? 13 : 11;
        return new bino.Margin(
          baseTopMargin + parseInt(TREE_NODE_PADDING / 2),
          0,
          0,
          TREE_NODE_BASE_HEIGHT + TREE_TEXTS_DETAILS_FONT_SIZE + marginAdder,
        );
      }),
      new bino.Binding("stroke", '', function(nodeData) {
        if (nodeData.firstName.includes("nknown")) {
          return TREE_TEXTS_NAMELESS_DETAILS_COLOR;
        }
        return TREE_TEXTS_DETAILS_TEXT_COLOR;
      }),
      new bino.Binding("text", '', function(nodeData) {
        let key = `detailsRow${index}`;
        if (!nodeData[key].text) return '';
        return `: ${nodeData[key].text}`;
      }),
    ),
    $(
      bino.TextBlock,
      {
        font: `700 ${TREE_TEXTS_DETAILS_FONT_SIZE}px Google Sans, sans-serif`,
        height: TREE_TEXTS_DETAILS_FONT_SIZE + 2,
        margin: new bino.Margin(
          baseTopMargin + parseInt(TREE_NODE_PADDING / 2),
          0,
          0,
          TREE_NODE_BASE_HEIGHT + TREE_TEXTS_DETAILS_FONT_SIZE,
        ),
      },
      textWidthBinding(),
      new bino.Binding("stroke", '', function(nodeData) {
        if (nodeData.firstName.includes("nknown")) {
          return TREE_TEXTS_NAMELESS_DETAILS_COLOR;
        }
        return TREE_TEXTS_DETAILS_LETTER_COLOR;
      }),
      new bino.Binding("text", '', function(nodeData) {
        if (!nodeData[`detailsRow${index}`].letter) return '';
        return `${nodeData[`detailsRow${index}`].letter}`;
      }),
    ),
  );
}

export const BirthPlaceText = () => { return PlacesText(2) };
export const MarriagePlaceText = () => { return PlacesText(3) };
export const DeathLivingPlaceText = () => { return PlacesText(4) };
