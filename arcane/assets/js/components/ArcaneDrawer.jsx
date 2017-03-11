import React, { Component } from 'react'
import {Divider, Drawer, AppBar, FontIcon, List, ListItem} from 'material-ui'
import ArcaneMenu from './ArcaneMenu'

const drawerStyle = {
  height: 'calc(100vh - 64px)',
  top:'64px',
  overflowY:'auto'
};
export default class ArcaneDrawer extends Component  {
  constructor(props){
    super(props);
  }
  render() {
      return (
        <Drawer
          containerStyle={drawerStyle}
          docked={false}
          open={this.props.open}
          onRequestChange={this.props.onRequestChange}>
          <ArcaneMenu onClick={this.props.handleClose}/>
        </Drawer>
      );
  }
}
