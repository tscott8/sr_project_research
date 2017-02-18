import React, { Component } from 'react'
import {Divider, Drawer, AppBar, FontIcon} from 'material-ui'
import GridMenu from './ArcaneMenu'
import MiniPlayer from './ArcaneMiniPlayer'
import Test from '../components/Test'


const drawerHeaderStyle = {
  root:{},
  icon: {
    margin:'1%',
    img: {
      padding:'10%',
      width: 'auto'
    }
  },
  label: {
    verticalAlign: 'middle',
    display:'inline-block',
    marginLeft:'5%'
  }
};
export class DrawerHeader extends Component  {

  constructor(props){
    super(props);
  }
  renderLogo() {
    <div style={drawerHeaderStyle.root}>
     <div style={drawerHeaderStyle.icon}></div>
     <div style={drawerHeaderStyle.label}>Arcane</div>
   </div>
  }
  render() {
      return (
        <AppBar
          title="Arcane"
          primary={true}
          onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}/>
      );
  }
}
const drawerStyle = {
  top:'64',
  justifyContent: 'space-between',
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
          {/* <DrawerHeader onLeftIconButtonTouchTap={this.props.handleClose}/> */}
          <GridMenu onClick={this.props.handleClose}/>
        </Drawer>
      );
  }
}
