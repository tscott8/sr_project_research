import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as TrackActions from '../actions/TrackActions'
import { TracksCollection } from '../components/Collections'

class Browse extends Component {
   constructor(props) {
      super(props);
      const { dispatch } = this.props;
      dispatch(TrackActions.getTracks());
   }

   render() {
      console.info("tracks in render: ", this.props.tracks);
      return (
         <div>
            <h1>Browse</h1>
         </div>
      );
   }
}

Browse.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { tracks } = state

  return {
     tracks
  }
}

export default connect(mapStateToProps)(Browse);
