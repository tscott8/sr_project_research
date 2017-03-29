import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Radio from '../components/Radio'
import * as TrackActions from '../actions/TrackActions'

class RadioPage extends Component {
   constructor(props) {
      super(props);
      const { dispatch } = this.props;
      dispatch(TrackActions.getTracks());
   }

   render() {
      return (
        <Radio
          isPlaying={this.props.audio.isPlaying}
          tracks={this.props.audio}
        />
      );
    }
}
RadioPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired,
  audio: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { tracks, audio } = state

  return {
     tracks, audio
  }
}

export default connect(mapStateToProps)(RadioPage);
