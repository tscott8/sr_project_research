import React, { Component } from 'react'
import {FontIcon, RaisedButton, GridList, GridTile} from 'material-ui'
import MiniPlayer from './ArcaneMiniPlayer'

const url = "http://localhost:8000/";

const iconStyle = {
  margin:'0',
  padding:'0',
  textAlign:'center',
  width:'inherit',
  height:'70%',
  fontSize:'40px',
  display:'block',
  paddingTop:'8%'
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
  paddingBottom:'8%'
};
const tileStyle = {
  width:'100%',
  height:'auto'
}

export class MenuTile extends Component {
  constructor(props){
    super(props);
    this.state = {active:false};
  }
  render() {
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
        style={tileStyle}/>
    );
  }
}

const menuList = [
  { "name": "Browse", "icon": "subscriptions", "url":url, featured:false },
  { "name": "Playlists", "icon": "subject", "url":"/main/genres" },
  { "name": "Upload", "icon": "cloud_upload", "url": "/main/uploads" },
  { "name": "Radio", "icon": "radio", "url": "/main/genres"},
  { "name": "My Music", "icon": "library_music", "url": "/main/artist-music"},
  { "name": "Profile", "icon": "account_circle", "url": "/main/artist"},
  { "name": "About", "icon": "info", "url": "/about"}
];

const gridMenuStyle = {
  display: 'flex',
  marginTop:'1%',
  marginBottom:'1%',
  width:'100%',
  height:'auto',
  overflowX: 'auto',
  overflowY: 'auto'
};
const gridStyle = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
  },
};
export default class GridMenu extends Component {
  constructor(props){
    super(props);
  }
  renderMenuMap() {
    let arr = [<GridTile
                    cols={2}
                    rows={2}>
                    <MiniPlayer/>
                  </GridTile>];
    let map = menuList.map((tile) => (
            <GridTile
              key={tile.name}
              cols={tile.featured ? 2 : 1}
              rows={tile.featured ? 2 : 1}>
              <MenuTile
                key={"menuTile" + tile.name}
                name={tile.name}
                icon={tile.icon}
                url={tile.url}
                onClick={this.props.onClick}/>
            </GridTile>
          ))
    arr.push.apply(arr,map);
    return arr;
  }
  render () {
    return (
      <div style={gridStyle.root}>
        <GridList
          cellHeight={'auto'}
          style={gridStyle.gridList}>
            {this.renderMenuMap()}
        </GridList>
      </div>
    );
  }
}
