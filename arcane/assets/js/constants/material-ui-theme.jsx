import { fade } from 'material-ui/utils/colorManipulator'
import * as Colors from 'material-ui/styles/colors';
import { spacing, getMuiTheme } from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

const muiTheme = {
   spacing: spacing,
   fontFamily: 'Roboto, sans-serif',
   palette: {
      primary1Color: Colors.grey900,
      primary2Color: Colors.grey900,
      primary3Color: Colors.grey700,
      accent1Color: Colors.cyan700,
      accent2Color: Colors.grey900,
      accent3Color: Colors.grey500,

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
      trackColor: Colors.redA700,
      trackSize: 3,
      trackColorSelected: Colors.redA700
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
    secondaryTextColor:Colors.grey300
   },
   tableRow:{
     hoverColor:Colors.cyan700,
     selectedColor:Colors.redA700
   }

};

//Theme must be wrapped in funciton getMuiTheme
export default getMuiTheme(darkBaseTheme);
