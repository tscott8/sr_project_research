import {grey100, redA700, cyan500, cyan700,
       fullBlack, darkBlack, white, grey400,
       grey500, grey300, grey900
       } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';
import {fade} from 'material-ui/utils/colorManipulator';

export const muiTheme = getMuiTheme({
   spacing: spacing,
   fontFamily: 'Roboto, sans-serif',
   palette: {
      primary1Color: cyan500,
      primary2Color: cyan700,
      primary3Color: grey400,
      accent1Color: redA700,
      accent2Color: grey500,
      accent3Color: grey500,
      textColor: white,
      alternateTextColor: white,
      canvasColor: grey900,
      borderColor: grey300,
      disabledColor: fade(darkBlack, 0.3),
      pickerHeaderColor: cyan500,
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack
   },
   slider: {
      trackColor: redA700,
      trackColorSelected: redA700
   }
});
