import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { render } from "react-dom"
import MuiThemeProvider from 'material-ui'


import * as GenreActions from '../actions/genres'

import AppContainer from "./AppContainer"
import muiTheme from "../constants/material-ui-theme"


class App extends React.Component {
  render() {
     const { genres, actions } = this.props;
     return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppContainer />
        </MuiThemeProvider>
    )
  }
}

App.propTypes = {
   actions: PropTypes.object.isRequired,
   genres: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    genres: state.genres
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GenreActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
