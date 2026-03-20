import { $, bino } from '../chart.js';
import {
  BaseNodeContainer,
  TopLeftBorderRadius,
  BottomLeftBorderRadius,
} from './person.js';
import { NameText } from './texts/name.js';
import { DatesText } from './texts/dates.js';
import {
  BirthPlaceText,
  MarriagePlaceText,
  DeathLivingPlaceText,
} from './texts/places.js';
import { Photo } from './photo.js';
import { GenderBand } from './gender.js';
import {
  DNAMarker,
  FirstMarker,
  SecondMarker,
  ThirdMarker,
  FourthMarker,
} from './markers.js';
import { showSidebar } from '../sidebar.js';
import { cursorBinding } from './bindings.js';

export const TreeNode = () => {
  return $(
    bino.Node, {
      selectable: false,
      click: (e, node) => {
        showSidebar(node);
      },
    },
    cursorBinding(),
    new bino.Binding('height', 'height'),
    new bino.Binding('width', 'width'),

    BaseNodeContainer(),
    Photo(),
    TopLeftBorderRadius(),
    BottomLeftBorderRadius(),

    GenderBand(),
    DNAMarker(),
    FirstMarker(),
    SecondMarker(),
    ThirdMarker(),
    FourthMarker(),

    NameText(),
    DatesText(),
    BirthPlaceText(),
    MarriagePlaceText(),
    DeathLivingPlaceText(),
  );
};
