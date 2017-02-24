import React, { Component } from 'react'
import {Divider, Drawer, AppBar, FontIcon, List, ListItem} from 'material-ui'
import MiniRadio from './ArcanePlayer'

const drawerStyle = {
  height: 'calc(100vh - 64px)',
  top:'64px',
  overflowY:'auto'
};
export default class RadioDrawer extends Component  {
  constructor(props){
    super(props);
  }
  render() {
      return (
        <Drawer
          containerStyle={drawerStyle}
          docked={false}
          open={this.props.open}
          openSecondary={true}
          onRequestChange={this.props.onRequestChange}>
          <MiniRadio/>
        </Drawer>
      );
  }
}
