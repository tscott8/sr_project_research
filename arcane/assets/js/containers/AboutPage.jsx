import React, { Component } from 'react'
import {Paper} from 'material-ui'
import ThemeSwitcher from '../components/ThemeSwitcher'
import SignUpForm from '../components/SignUpForm'

export default class AboutPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
        open:true
      }
   }

   render() {
      return (
        <Paper>
          {/* <ThemeSwitcher {...this.props}/> */}
          <SignUpForm {...this.props} open={this.state.open}           onRequestClose={() => {this.setState({open:false})}}
          />
          <h2>About</h2>
          <h5>Also for testing uses</h5>
        </Paper>

      );
   }
}
