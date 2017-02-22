import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as TrackActions from '../actions/TrackActions'

class Radio extends Component {
   constructor(props) {
      super(props);
      const { dispatch } = this.props;
      dispatch(TrackActions.getTracks());
   }

   render() {
      return (
         <h1>Radio</h1>
      );
   }
}

Radio.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { getTracks } = state

  return {
    getTracks
  }
}

export default connect(mapStateToProps)(Radio);
