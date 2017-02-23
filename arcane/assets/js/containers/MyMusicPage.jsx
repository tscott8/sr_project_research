import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as TrackActions from '../actions/TrackActions'
import {TracksCollection} from '../components/Collections'

class MyMusic extends Component {

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(TrackActions.getTracks());
  }


  render() {
    console.info('in render, tracks:', this.props.tracks);
      return (
        <div>
          <h1>My Music</h1>
            <TracksCollection tracks={this.props.tracks} />
        </div>
      );
  }
}

MyMusic.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { tracks } = state

  return {
    tracks
  }
}

export default connect(mapStateToProps)(MyMusic);
