import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import {Paper} from 'material-ui'
export default class AboutPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
        open:false
      }
   }

   render() {
      return (
        <Paper>
          {/* <FlatButton primaryText="Trigger Login" onClick={() => {this.setState({open: !this.state.open})}}/> */}
          <LoginForm {...this.props} />
          <h2>About</h2>
          <h5>Also for testing uses</h5>
        </Paper>

      );
   }
}
