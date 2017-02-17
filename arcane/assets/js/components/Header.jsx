import React, { Component } from 'react'
import { AppBar } from 'material-ui'
import ArcaneDrawer from './ArcaneDrawer'


const drawerHeaderStyle = {
  root: {
    width:'100%',
    display:'flex'
  },
  icon: {
    marginRight:'10%'
  },
  label: {
    display:'inline-block'
  }

};

export default class Header extends Component  {

  constructor(props){
    super(props);
    this.state = {open:false};
  }

  handleToggle() { this.setState({open: !this.state.open}); }
  handleClose() { this.setState({open: false}); }
  render() {
      return (
          <div>
            <ArcaneDrawer
              open={this.state.open}
              handleClose={this.handleClose.bind(this)}/>
            <AppBar
              title="Arcane"
              primary={true}
              onLeftIconButtonTouchTap={this.handleToggle.bind(this)}/>
          </div>
      );
  }
}
