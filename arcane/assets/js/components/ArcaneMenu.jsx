import React, { Component } from 'react'
import {FontIcon, RaisedButton, GridList, GridTile} from 'material-ui'
import SquareButton from './SquareButton'
const url = "http://localhost:8000/";

const menuList = [
  { "name": "Browse", "icon": "subscriptions", "url":"browse"},
  { "name": "Playlists", "icon": "subject", "url":"playlists" },
  { "name": "Upload", "icon": "cloud_upload", "url": "upload" },
  { "name": "Radio", "icon": "radio", "url": "radio"},
  { "name": "My Music", "icon": "library_music", "url": "my_music"},
  { "name": "Profile", "icon": "account_circle", "url": "profile"},
  { "name": "About", "icon": "info", "url": "about"}
];

const gridStyle = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height:'auto',
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  gridTile: {
    maxWidth: 'calc(100vw/8)',
    maxHeight: 'calc(100vw/8)',
    minHeight:'calc((100vh - 64px)/7)',

  },
};
export default class ArcaneMenu extends Component {
  constructor(props){
    super(props);
  }
  renderMenuMap() {
    let map = menuList.map((tile) => (
            <GridTile
              key={tile.name}
              cols={tile.featured ? 2 : 1}
              rows={tile.featured ? 2 : 1}
              style={gridStyle.gridTile}>
              <SquareButton
                key={"menuTile" + tile.name}
                name={tile.name}
                icon={tile.icon}
                url={tile.url}
                onClick={this.props.onClick}/>
            </GridTile>
          ))
    return map;
  }
  render () {
    return (
      <div style={gridStyle.root}>
        <GridList
          cols={2}
          cellHeight={'auto'}
          style={gridStyle.gridList}>
            {this.renderMenuMap()}
        </GridList>
      </div>
    );
  }
}
