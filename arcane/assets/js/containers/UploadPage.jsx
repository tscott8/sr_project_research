import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Uploader from '../components/Uploader'
import * as TrackActions from '../actions/TrackActions'

class UploadPage extends Component {
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

UploadPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { tracks } = state

  return {
     tracks
  }
}

export default connect(mapStateToProps)(UploadPage);
