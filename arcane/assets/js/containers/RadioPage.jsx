import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Radio from '../components/Radio'
import { TracksCollection } from '../components/Collections'
import * as TrackActions from '../actions/TrackActions'
import Tile from '../components/Tile'

class RadioPage extends Component {
   constructor(props) {
      super(props);
      const { dispatch } = this.props;
      dispatch(TrackActions.getTracks());
   }

   render() {
     const {tracks} = this.props;
     console.log('IN RADIO Page', tracks)

      return (
         <div>
           <Radio tracks={this.props.tracks}/>
           {/* <TracksCollection tracks={this.props.tracks}/>, */}
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
