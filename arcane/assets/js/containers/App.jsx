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

class App extends Component {

  componentDidMount() {
    this.props.actions.trackActions.getTracks();
    this.props.actions.genreActions.getGenres();
  }

  render() {
     const { genres, tracks, actions} = this.props;
     console.log(genres,tracks)
     return (
        <MuiThemeProvider muiTheme={theme}>
          <div>
            <Header />
            <CollectionTabs genres={genres} tracks={tracks} actions={actions}/>
            <LargePlayer/>
          </div>
        </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  genres: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired

}

function mapStateToProps(state) {
  return {
    genres: state.genres,
    tracks: state.tracks

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      genreActions: bindActionCreators(GenreActions, dispatch),
      trackActions: bindActionCreators(TrackActions, dispatch)
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
