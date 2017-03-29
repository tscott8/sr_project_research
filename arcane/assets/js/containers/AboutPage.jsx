import React, { Component } from 'react'
import {Paper} from 'material-ui'
import ThemeSwitcher from '../components/ThemeSwitcher'
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
          <ThemeSwitcher {...this.props}/>
          <h2>About</h2>
          <h5>Also for testing uses</h5>
        </Paper>

      );
   }
}
