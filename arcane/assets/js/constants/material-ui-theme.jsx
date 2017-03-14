import { fade } from 'material-ui/utils/colorManipulator'
import * as Colors from 'material-ui/styles/colors';
import { spacing, getMuiTheme } from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

const arcaneDark = {
  spacing: spacing,
  fontFamily: 'Aldrich, Open Sans, sans-serif',
  palette: {
     primary1Color: Colors.grey900,
     primary2Color: Colors.grey800,
     primary3Color: Colors.grey700,
     accent1Color: Colors.cyanA700,
     accent2Color: Colors.redA700,
     accent3Color: Colors.grey700,

     textColor: Colors.white,
     secondaryTextColor: fade(Colors.white, 0.7),
     alternateTextColor: Colors.redA700,
     canvasColor: Colors.grey800,
     borderColor: Colors.cyanA700,
     disabledColor: fade(Colors.darkBlack, 0.3),
     pickerHeaderColor: fade(Colors.darkBlack, 0.12),
     clockCircleColor: fade(Colors.darkBlack, 0.07),
     shadowColor: Colors.fullBlack,

  },
  slider: {
     trackColor: Colors.transparent,
     trackSize: 3,
     trackColorSelected: fade(Colors.white, .3),
     selectionColor: Colors.redA700,
     handleColorZero: Colors.redA700,
  },
  drawer: {
    width:280,
    color:Colors.grey900
  },
  iconButton: {
   color: Colors.redA700
  },
  raisedButton: {
   secondaryColor:Colors.redA700,
   secondaryTextColor:Colors.fullBlack
  },
  tableRow:{
    hoverColor:Colors.cyanA700,
    selectedColor:Colors.redA700
  },
  snackbar:{
    backgroundColor:Colors.grey900
  },
  appBar: {
   //  textColor:Colors.white,
  },
  stepper: {
    iconColor:Colors.redA700
  },
  menuItem: {
    hoverColor: fade(Colors.cyanA700, 0.3),
  },
  listItem: {
    hoverColor: fade(Colors.cyanA700, 0.3),
  },

};

const googlePlay = {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: Colors.deepOrangeA700,
    primary2Color: Colors.grey200,
    primary3Color: Colors.grey400,
    accent1Color: Colors.deepOrangeA700,
    accent2Color: Colors.grey300,
    accent3Color: Colors.grey500,
    textColor: Colors.fullBlack,
    secondaryTextColor: fade(Colors.fullBlack, 0.54),
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.deepOrangeA700,
    disabledColor: fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.deepOrangeA700,
    clockCircleColor: fade(Colors.darkBlack, 0.07),
    shadowColor: Colors.fullBlack,
  },
  drawer: {
    width:280,
  },
  // raisedButton: {
  //   primaryColor:Colors.white,
  //   primaryTextColor:Colors.deepOrangeA700,
  // },
  menuItem: {
    hoverColor:Colors.deepOrangeA700,
  },
  listItem:{
    hoverColor:fade(Colors.deepOrangeA700,.3),
  },
   stepper: {
     iconColor:fade(Colors.deepOrangeA700,.3),
   }
};
const spotify = {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
   primary1Color: Colors.darkBlack,
   primary2Color: Colors.darkBlack,
   primary3Color: Colors.grey600,
   accent1Color: Colors.green700,
   accent2Color: Colors.green600,
   accent3Color: Colors.green500,
   textColor: Colors.fullWhite,
   secondaryTextColor: fade(Colors.fullWhite, 0.7),
   alternateTextColor: Colors.green700,
   canvasColor: Colors.darkBlack,
   borderColor: fade(Colors.fullWhite, 0.3),
   disabledColor: fade(Colors.fullWhite, 0.3),
   pickerHeaderColor: fade(Colors.fullWhite, 0.12),
   clockCircleColor: fade(Colors.fullWhite, 0.12),
 },
 drawer: {
   width:280,
 },
 slider: {
    trackColor: Colors.transparent,
    trackSize: 3,
    trackColorSelected: fade(Colors.white, .3),
    selectionColor: Colors.green700,
    handleColorZero: Colors.green700,
 },
 menuItem: {
   hoverColor: fade(Colors.green700, 0.3),
 },
 listItem: {
   hoverColor: fade(Colors.green700, 0.3),
 },
  // raisedButton: {
  //   secondaryColor:Colors.white,
  //   secondaryTextColor: Colors.deepOrangeA700,
  //   disabledTextColor: Colors.deepOrangeA700,
  // },
  // menuItem: {
  //   hoverColor:Colors.deepOrangeA700,
  // },
  //  stepper: {
  //    iconColor:Colors.deepOrangeA700,
  //  }
};

//Theme must be wrapped in funciton getMuiTheme
export default getMuiTheme(arcaneDark );
