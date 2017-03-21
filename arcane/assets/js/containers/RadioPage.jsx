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
     const {tracks} = this.props;
     console.log('IN RADIO Page', this.props)

      return (<Radio tracks={this.props.tracks}/>);
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
