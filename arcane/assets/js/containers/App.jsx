import React, {Component, PropTypes} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from "../constants/material-ui-theme"
import Header from "../components/Header"
import CollectionTabs from '../components/CollectionTabs'
import LargePlayer from '../components/FooterPlayer'
import * as GenreActions from '../actions/GenreActions'
import * as TrackActions from '../actions/TrackActions'
import * as ArtistActions from '../actions/ArtistActions'
import * as AlbumActions from '../actions/AlbumActions'
import Uploader from '../components/Uploader'
const appBody = {
  width:'100%',
  height:'100%',
  background: 'rgb(70, 70, 70) repeat top center fixed',
  backgroundSize:'cover',
  position:'fixed'
};

export default class App extends Component {

  // componentDidMount() {
  //   this.props.actions.genreActions.getGenres();
  //   this.props.actions.trackActions.getTracks();
  //   this.props.actions.artistActions.getArtists();
  //   this.props.actions.albumActions.getAlbums();
  // }

  render() {
     return (
        <MuiThemeProvider muiTheme={theme}>
          <div style={appBody}>
            <Header />
            {/* <Uploader/> */}
            {this.props.children}

            <LargePlayer/>
          </div>
        </MuiThemeProvider>
    );
  }
}
