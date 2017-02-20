import { fade } from 'material-ui/utils/colorManipulator'
import * as Colors from 'material-ui/styles/colors';
import { spacing, getMuiTheme } from 'material-ui/styles';

const muiTheme = {
   spacing: spacing,
   fontFamily: 'Roboto, sans-serif',
   palette: {
      primary1Color: Colors.grey900,
      primary2Color: Colors.grey900,
      primary3Color: Colors.grey700,
      accent1Color: Colors.redA700,
      accent2Color: Colors.grey900,
      accent3Color: Colors.grey700,

      textColor: Colors.white,
      secondaryTextColor: fade(Colors.white, 0.7),
      alternateTextColor: Colors.redA700,
      canvasColor: Colors.grey700,

     disabledColor: fade(Colors.darkBlack, 0.3),
     pickerHeaderColor: fade(Colors.darkBlack, 0.12),
     clockCircleColor: fade(Colors.darkBlack, 0.07),
     shadowColor: Colors.fullBlack,
   },
   slider: {
      trackColor: Colors.redA700,
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
    secondaryTextColor:Colors.grey300
    },

};

//Theme must be wrapped in funciton getMuiTheme
export default getMuiTheme(muiTheme);
