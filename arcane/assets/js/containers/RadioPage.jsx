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
     console.log('IN RADIO Page', this.props)

      return (<Radio tracks={this.props.audio}/>);
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
