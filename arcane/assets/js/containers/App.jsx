import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from "../constants/material-ui-theme"
import Header from "../components/Header"

const appBody = {
  width:'100%',
  height:'100%',
  background: 'rgb(70, 70, 70) repeat top center fixed',
  backgroundSize:'cover',
  position:'fixed'
};

export default class App extends Component {
  render() {
    const currentPage = this.props.routes[this.props.routes.length-1].path
     return (
        <MuiThemeProvider muiTheme={theme}>
          <div style={appBody}>
            <Header currentPage={currentPage ?  (" / " + this.props.routes[this.props.routes.length-1].path) : ""}/>
            {this.props.children}
          </div>
        </MuiThemeProvider>
    );
  }
}
