import React, { Component } from 'react'
import {Divider, Drawer} from 'material-ui'
import GridMenu from './ArcaneMenu'
import MiniPlayer from './ArcaneMiniPlayer'


const drawerHeaderStyle = {
  root: {
    width:'100%',
    display:'flex'
  },
  icon: {
    margin:'1%',
    img: {
      height:'99%',
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
  render() {
      return (
          <div style={drawerHeaderStyle.root}>
            <div style={drawerHeaderStyle.icon}><img style={drawerHeaderStyle.icon.img} src="images/favicon.png"/></div>
            <div style={drawerHeaderStyle.label}><h1>Arcane</h1></div>
          </div>
      );
  }
}
const drawerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
};
export default class ArcaneDrawer extends Component  {
  constructor(props){
    super(props);
  }
  render() {
      return (
        <Drawer
          style={drawerStyle}
          docked={false}
          open={this.props.open}
          handleToggle={this.props.handleClose}>
          <DrawerHeader/>
          <Divider/>
          <MiniPlayer/>
          <GridMenu onClick={this.props.handleClose}/>
        </Drawer>
      );
  }
}
