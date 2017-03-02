import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Uploader from '../components/Uploader'
import * as TrackActions from '../actions/TrackActions'
const ID3 = require('id3-parser');


class Track {
   constructor() {
      this.name = "";
      this.duration = "";
      this.length = 0;
      this.url = null;
      this.artist = null;
      this.album = null;
      this.genre = null;
   }
}


class UploadPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         tracks: []
      }
      const { dispatch } = this.props;
      dispatch(TrackActions.getTracks());
   }

   addTrack(track) {
      console.info(track);
      let newTrack = new Track();
      newTrack.url = track;
      ID3.parse(track).then(tag => {
          console.info(tag); // the parsed tag info
      });
      // this.setState({
      //    tracks: this.state.tracks.push(track)
      // });
   }

   submit() {

   }

   render() {
      console.info("tracks in render: ", this.props.tracks);
      return (
         <div>
            <Uploader files={this.state.tracks} addTrack={this.addTrack.bind(this)}/>
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
