import React, { Component } from 'react'
import {FontIcon, RaisedButton, GridList, GridTile} from 'material-ui'

const iconStyle = {
  margin:'0',
  padding:'0',
  textAlign:'center',
  width:'inherit',
  height:'70%',
  fontSize:'50px',
  display:'block',
  paddingTop:'15%'
};
const labelStyle= {
  margin:'0',
  padding:'0',
  textAlign:'center',
  width:'inherit',
  height:'auto',
  fontSize:'15px',
  display:'block',
  paddingTop:'10%',
  paddingBottom:'15%'
  };
const tileStyle = {
  minWidth:'47%',
  height:'auto',
  lineHeight:'100%',
  verticalAlign:'middle'};
const tileStyle2 = {
  width:'100%',
  height:'auto'
}


export class MenuTile extends Component {
  constructor(props){
    super(props);
    this.state = {active:false};
  }

  renderButton() {
    return(
      <RaisedButton
        href=""
        target="_blank"
        secondary={true}
        onClick={this.props.onClick}
        icon={<FontIcon
            className="material-icons"
            style={iconStyle}>{this.props.icon}</FontIcon>}
        label={this.props.name}
        labelStyle={labelStyle}
        style={tileStyle2}/>
    );
  }

  render() {
    return (
      <GridTile>{this.renderButton()}</GridTile>
    );
  }
}

const menuList = [
  { "name": "Playlists", "icon": "subject", "url":"/main/genres" },
  { "name": "Upload", "icon": "cloud_upload", "url": "/main/uploads" },
  { "name": "Radio", "icon": "play_circle_outline", "url": "/main/genres"},
  { "name": "My Music", "icon": "home", "url": "/main/artist-music"},
  { "name": "Profile", "icon": "account_circle", "url": "/main/artist"},
  { "name": "About", "icon": "info", "url": "/about"}
];

const gridMenuStyle = {
  marginTop:'1%',
  marginBottom:'1%',
  width:'100%',
  height:'auto',
  overflowY: 'auto'
};

export default class GridMenu extends Component {
  constructor(props){
    super(props);
  }
  renderMenuList() {
    let items = [];
    for (let i = 0; i < menuList.length; i++) {
         let item = menuList[i];
         items.push(<MenuTile key={"menuTile" + i} name={item.name} icon={item.icon} onClick={this.props.onClick}/>);
      }
      console.log(items)
      return items;
  }
  render () {
    return (
      <GridList cellHeight={'auto'}
        style={gridMenuStyle}>{this.renderMenuList()}</GridList>
    );
  }
}
