import React, { Component } from 'react'
import { Drawer, AppBar, MenuItem, GridList, GridTile, FlatButton, FontIcon, Divider} from 'material-ui'
import MenuTile from './MenuTile'

const menuList = [
  { "name": "Playlists", "icon": "subject", "url":"/main/genres" },
  { "name": "Upload", "icon": "cloud_upload", "url": "/main/uploads" },
  { "name": "Radio", "icon": "play_circle_outline", "url": "/main/genres"},
  { "name": "My Music", "icon": "home", "url": "/main/artist-music"},
  { "name": "Profile", "icon": "account_circle", "url": "/main/artist"},
  { "name": "About", "icon": "info", "url": "/about"}
];
const drawerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
};
const gridStyle = {
  marginTop:'1%',
  width:'100%',
  height:'auto',
  overflowY: 'auto'
};

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
  renderMenuList() {
    let items = [];
    for (let i = 0; i < menuList.length; i++) {
         let item = menuList[i];
         items.push(<MenuTile key={"menuTile" + i} name={item.name} icon={item.icon} onClick={this.handleClose.bind(this)}/>);
      }
      console.log(items)
      return items;
  }
  render() {
      return (
          <div>
            <Drawer
              style={drawerStyle}
              docked={false}
              open={this.state.open}>
              <div style={drawerHeaderStyle.root}>
                <img style={drawerHeaderStyle.icon} src="images/favicon.png"/>
                <h1 style={drawerHeaderStyle.label}>Arcane</h1>
              </div>
              <Divider/>
              <GridList cellHeight={'auto'}
                style={gridStyle}>{this.renderMenuList()}</GridList>
            </Drawer>

          <AppBar
            title="Arcane"
            primary={true}
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}/>
          </div>
      );
  }
}
