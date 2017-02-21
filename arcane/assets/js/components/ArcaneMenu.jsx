import React, { Component } from 'react'
import {FontIcon, RaisedButton, GridList, GridTile} from 'material-ui'
import MiniPlayer from './MiniPlayer'
import SquareButton from './SquareButton'
const url = "http://localhost:8000/";

const menuList = [
  { "name": "Browse", "icon": "subscriptions", "url":url, featured:false },
  { "name": "Playlists", "icon": "subject", "url":"/main/genres" },
  { "name": "Upload", "icon": "cloud_upload", "url": "/main/uploads" },
  { "name": "Radio", "icon": "radio", "url": "/main/genres"},
  { "name": "My Music", "icon": "library_music", "url": "/main/artist-music"},
  { "name": "Profile", "icon": "account_circle", "url": "/main/artist"},
  { "name": "About", "icon": "info", "url": "/about"}
];

const gridStyle = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height:'auto',
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
};
export default class GridMenu extends Component {
  constructor(props){
    super(props);
  }
  renderMenuMap() {
    let arr = [<GridTile
                    key={'miniPlayer'}
                    cols={2}
                    rows={2}>
                    <MiniPlayer/>
                  </GridTile>];
    let map = menuList.map((tile) => (
            <GridTile
              key={tile.name}
              cols={tile.featured ? 2 : 1}
              rows={tile.featured ? 2 : 1}>
              <SquareButton
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
