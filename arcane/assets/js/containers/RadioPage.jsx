import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as TrackActions from '../actions/TrackActions'
import { TracksCollection } from '../components/Collections'

class Radio extends Component {
   constructor(props) {
      super(props);
      const { dispatch } = this.props;
      if (this.props.tracks.length == 0)
         dispatch(TrackActions.getTracks());
   }

   render() {
      console.info("tracks in render: ", this.props.tracks);
      return (
         <div>
            <TracksCollection tracks={this.props.tracks} />
         </div>
      );
   }
}

Radio.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { tracks } = state

  return {
     tracks
  }
}

export default connect(mapStateToProps)(Radio);
