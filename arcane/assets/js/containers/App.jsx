import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from "../constants/material-ui-theme"
import Audio from '../components/Audio'
import Header from "../components/Header"
import FloatingControls from '../components/FloatingControls'
import * as ActionTypes from '../constants/ActionTypes'
import * as AudioActions from '../actions/AudioActions'
import find from 'lodash/find'

const appBody = {
  width:'100%',
  height:'100%',
  background: 'rgb(70, 70, 70) repeat top center fixed',
  backgroundSize:'cover',
  position:'fixed'
};

@connect(
  state => ({audio: state.audio}),
  dispatch => bindActionCreators(AudioActions, dispatch)
)

export default class App extends Component {


   componentDidMount() {
       // Initialize DOM Audio and retrieve
    this.props.updateVolume(ReactDOM.findDOMNode(this.refs.audio), this.props.audio.volume);
    this.props.setProgress(ReactDOM.findDOMNode(this.refs.audio));
    this.props.setTime(ReactDOM.findDOMNode(this.refs.audio));
    this.props.retrieveSongs();
  }

  handleProgress = () => {
    this.props.setProgress(ReactDOM.findDOMNode(this.refs.audio));
  }

  handleTimeupdate = () => {
    this.props.setTime(ReactDOM.findDOMNode(this.refs.audio));
  }

  handleError = (e) => {
    this.props.setError(ReactDOM.findDOMNode(this.refs.audio));
  }

  handlePlay = () => {
    this.props.play(ReactDOM.findDOMNode(this.refs.audio));
  }

  handleNext = () => {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.next(audio);
  }

  handlePrevious = () => {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.previous(audio);
  }

  handleVolumeChange = (volume) => {
    this.props.updateVolume(ReactDOM.findDOMNode(this.refs.audio), volume);
  }

  handleToggleFavorite = () => {
    this.props.toggleFavorite();
  }

  handleToggleRepeat = () => {
    this.props.toggleRepeat();
  }

  handleTrackClick = (percent) => {
    this.props.updatePosition(ReactDOM.findDOMNode(this.refs.audio), percent/100);
  }

  handleEnd = () => {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.next(audio);
  }

  handleToggleLoop = () => {
    this.props.toggleLoop(ReactDOM.findDOMNode(this.refs.audio));
  }

  handleLoadedData = () => {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    if (this.props.audio.isRepeating) {
      this.props.play(audio);
    }
  }
  // componentDidMount() {
  //   this.props.actions.genreActions.getGenres();
  //   this.props.actions.trackActions.getTracks();
  //   this.props.actions.artistActions.getArtists();
  //   this.props.actions.albumActions.getAlbums();
  // }

  render() {
      const {
        volume, isPlaying, percent, isFavorite, progress, error,
        duration, isRepeating, songs, currentID, autoplay, isLooping
      } = this.props.audio;

      let song = find(songs[3], (o) => o.id === currentID);
      if (song === undefined) song = this.props.audio.defaultSong;

     const currentPage = this.props.routes[this.props.routes.length-1].path
     return (
        <MuiThemeProvider muiTheme={theme}>
          <div style={appBody}>
             <Audio ref="audio"
               autoplay={false}
               source={song.url}
               onProgress={this.handleProgress}
               onTimeupdate={this.handleTimeupdate}
               onError={this.handleError}
               onEnded={this.handleEnd}
               onLoadedData={this.handleLoadedData} />

            <Header currentPage={currentPage ?  (" / " + this.props.routes[this.props.routes.length-1].path) : ""}
               onNext={this.handleNext}
               onPlay={this.handlePlay}
               onPrevious={this.handlePrevious}
               onToggleRepeat={this.handleToggleRepeat}
               onToggleLoop={this.handleToggleLoop}
               onSetTime={this.handleTimeupdate}
               percent={percent}
               isRepeating={isRepeating}
               isLooping={isLooping}/>
            {this.props.children}
            <FloatingControls
               isPlaying={isPlaying}
               onPlay={this.handlePlay}
               onNext={this.handleNext}
               percent={percent} />
          </div>
        </MuiThemeProvider>
    );
  }
}
