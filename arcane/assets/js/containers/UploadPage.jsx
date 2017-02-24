import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Uploader from '../components/Uploader'
import * as TrackActions from '../actions/TrackActions'

class Upload extends Component {
   constructor(props) {
      super(props);
      const { dispatch } = this.props;
      dispatch(TrackActions.getTracks());
   }

   render() {
      console.info("tracks in render: ", this.props.tracks);
      return (
         <div>
            <Uploader/>
         </div>
      );
   }
}

Upload.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { tracks } = state

  return {
     tracks
  }
}

export default connect(mapStateToProps)(Upload);
