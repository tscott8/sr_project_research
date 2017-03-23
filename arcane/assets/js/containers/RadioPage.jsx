import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Radio from '../components/Radio'
import * as TrackActions from '../actions/TrackActions'
import Tile from '../components/Tile'

const url = "http://localhost:8000/";


class RadioPage extends Component {
   constructor(props) {
      super(props);
      const { dispatch } = this.props;
      dispatch(TrackActions.getTracks());
   }

   render() {
     const {audio} = this.props;
     console.log('IN RADIO Page', audio)

      return (
         <div>
           <Radio tracks={audio}/>
           {/* <TracksCollection tracks={this.props.tracks}/>, */}
            {/* <Tile
              name={"Test"}
              imgURL={url+'static/images/default-artwork.png'}
              tracks={this.props.tracks}
              select={this.props.select}
              selectedTracks={this.props.selectedTracks}/> */}
         </div>
      );
   }
}

RadioPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { tracks, albums, audio } = state

  return {
     tracks, audio
  }
}

export default connect(mapStateToProps)(RadioPage);
