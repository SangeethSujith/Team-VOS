import {Dimensions, Platform} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const {width, height} = Dimensions.get('window');


export const COLORS = {
  primary      : '#1D864A',
  primary_light: "#E4FFF0",
  primary_black: 'grey',
  heading_black: '#4f4a3d',
  white        : '#ffff',
  black        : '#000000',
  background   : '#F7F7F7',
};

export const Fonts = {
  font_800 : Platform.OS   === 'ios' ? 'manrope-extrabold'  : 'manrope-extrabold',
  font_700 : Platform.OS   === 'ios' ? 'manrope-bold'       : 'manrope-bold',
  font_600 : Platform.OS   === 'ios' ? 'manrope-semibold'   : 'manrope-semibold',
  font_500 : Platform.OS   === 'ios' ? 'manrope-medium'     : 'manrope-medium',
  font_400 : Platform.OS   === 'ios' ? 'manrope-regular'    : 'manrope-regular',
};
export const Dimens = {
  mainPadding  : 10,
  largePadding : 24,
  mediumPadding: 12,
  smallPadding : 2,
};

export const SIZES = {
  base: 10,
  //width,
  //height,
  font    : 14,
  radius  : 30,
  padding : 10,
  padding2: 12,
  //RADIUS
  radius30   : RFValue(29),
  radius25   : RFValue(24),
  radius12   : RFValue(11),
  radius15   : RFValue(14),
  radius6    : RFValue(5),
  //BORDER
  borderhalf : RFValue(.5),
  borderone  : RFValue(1),
  bordertwo  : RFValue(2),
  borderFOUR : RFValue(4),
     
  //IMAGE
  image50     : RFValue(49),
  image120    : RFValue(119),
  image110    : RFValue(109),
  image170    : RFValue(169),
  image210    : width/2.5,
  windowwidth : width,
  plusbutton  : RFValue(59),
  zindex40    : RFValue(39),
  icon        : RFValue(19),
  height70    : RFValue(69),
  profile     : RFValue(79),
  //shadow.......................
  Shadowwidth : RFValue(80),
  Shadowheight: RFValue(37),
  boxwidth    : RFValue(98),
  //SIZES
  five       : RFValue(4),
  eight      : RFValue(8),
  ten        : RFValue(9),
  button     : RFValue(44),
  // font sizes
  vsmall     : RFValue(10),
  small      : RFValue(11),
  medium     : RFValue(13),
  large      : RFValue(15),
  verylarge  : RFValue(17),
  extralarge : RFValue(23),
};
export const PERCENT = {
  P100  : RFPercentage(100),
  P70   : RFPercentage(70),

}

const theme = {COLORS, SIZES, Fonts};

export default theme;