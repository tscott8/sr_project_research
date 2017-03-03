import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as TrackActions from '../actions/TrackActions'
import Radio from '../components/Radio'
import Tile from '../components/Tile'

class RadioPage extends Component {
   constructor(props) {
      super(props);
      const { dispatch } = this.props;
      if (this.props.tracks.length == 0)
         dispatch(TrackActions.getTracks());
   }

   render() {
      console.info("tracks in render: ", this.props.tracks.results);
      return (
         <div>
            <Radio/>
            <Tile name={"Test"} imgURL={'static/images/default-artwork.png'} track={this.props.tracks}/>
         </div>
      );
   }
}

RadioPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { tracks, albums } = state

  return {
     tracks
  }
}

export default connect(mapStateToProps)(RadioPage);
