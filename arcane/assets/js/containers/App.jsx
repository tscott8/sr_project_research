import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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

class App extends Component {

  // componentDidMount() {
  //   this.props.actions.genreActions.getGenres();
  //   this.props.actions.trackActions.getTracks();
  //   this.props.actions.artistActions.getArtists();
  //   this.props.actions.albumActions.getAlbums();
  // }

  render() {
     const { genres, tracks, artists, albums, actions } = this.props;
     return (
        <MuiThemeProvider muiTheme={theme}>
          <div style={appBody}>
            <Header />
            {/* <Uploader/> */}
              <CollectionTabs
                genres={genres}
                tracks={tracks}
                artists={artists}
                albums={albums}
                actions={actions}/>
            <LargePlayer/>
          </div>
        </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  genres: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  albums: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    genres: state.genres,
    tracks: state.tracks,
    artists: state.artists,
    albums: state.albums,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      genreActions: bindActionCreators(GenreActions, dispatch),
      trackActions: bindActionCreators(TrackActions, dispatch),
      artistActions: bindActionCreators(ArtistActions, dispatch),
      albumActions: bindActionCreators(AlbumActions, dispatch)
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
