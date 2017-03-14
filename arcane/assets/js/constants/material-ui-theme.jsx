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
      accent1Color: Colors.cyan700,
      accent2Color: Colors.redA700,
      accent3Color: Colors.grey600,
      textColor: Colors.white,
      secondaryTextColor: fade(Colors.white, 0.7),
      alternateTextColor: Colors.redA700,
      canvasColor: Colors.grey700,
      borderColor: Colors.cyan700,
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
    secondaryTextColor: Colors.fullBlack,
   },
   tableRow:{
     selectedColor:Colors.redA700
   },
   snackbar:{
     backgroundColor:Colors.grey900
   },
   appBar: {
    //  textColor:Colors.white,
   },
   menuItem: {
     hoverColor: fade(Colors.cyan700, 0.3),
   },
   listItem: {
     hoverColor: fade(Colors.cyan700, 0.3),
   },

};

const googlePlay = {
  spacing: spacing,
  palette: {
     primary1Color: "#ffffff",
     primary2Color: '#f4522b',
     primary3Color: "#fd8c00",
     accent1Color: "#f4522b",
     accent2Color: "#f5f5f5",
     accent3Color: "#9e9e9e",

     textColor: Colors.darkBlack,
     alternateTextColor:  '#f4522b',
     canvasColor:"#ffffff",
     alternateCanvasColor: "#212121",
     alternate1Color: "rgba(255, 255, 255, 0.54)",
     alternate2Color: "#f5f5f5",
     borderColor: "#bdbdbd",
     disabledColor: "rgba(0,0,0,0.3)",
     pickerHeaderColor: "#ffffff",
     clockCircleColor: "rgba(0,0,0,0.07)",
     shadowColor: "rgba(0,0,0,1)",
  },
};

//Theme must be wrapped in funciton getMuiTheme
export default getMuiTheme(arcaneDark );
