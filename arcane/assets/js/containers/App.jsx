import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from "../constants/material-ui-theme"
import Header from "../components/Header"
import * as GenreActions from '../actions/genres'
import CollectionTabs from '../components/CollectionTabs'
import LargePlayer from '../components/FooterPlayer'

class App extends Component {
  render() {
     const { genres, actions } = this.props;
     return (
        <MuiThemeProvider muiTheme={theme}>
          <div>
            <Header />
            <CollectionTabs/>
            <LargePlayer/>
          </div>
        </MuiThemeProvider>
    );
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
