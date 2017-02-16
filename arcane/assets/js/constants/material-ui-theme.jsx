import { fade } from 'material-ui/utils/colorManipulator'
import * as Colors from 'material-ui/styles/colors';
import { spacing, getMuiTheme } from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const muiTheme = {
   spacing: spacing,
   fontFamily: 'Roboto, sans-serif',
   palette: {
      primary1Color: Colors.grey900,
      primary2Color: Colors.redA700,
      primary3Color: Colors.grey500,
      accent1Color: Colors.redA700,
      accent2Color: Colors.grey500,
      accent3Color: Colors.grey500,
      textColor: Colors.redA700,
      alternateTextColor: Colors.white,
      canvasColor: '#303030',

      borderColor: Colors.redA700,
      disabledColor: fade(Colors.darkBlack, 0.3),
      pickerHeaderColor: Colors.grey900,
      clockCircleColor: fade(Colors.darkBlack, 0.07),
      shadowColor: Colors.fullBlack
   },
   slider: {
      trackColor: Colors.redA700,
      trackColorSelected: Colors.redA700
   }
};

//Theme must be wrapped in funciton getMuiTheme
export default getMuiTheme(muiTheme);
