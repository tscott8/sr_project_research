import React, {Component} from 'react';
import {GridTile, GridList,
  FontIcon, Avatar, IconButton,
  IconMenu, Menu, MenuItem,
  List, ListItem, Divider} from 'material-ui'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import SquareButton from './SquareButton'
import Tile from './Tile'
import MediaQuery from 'react-responsive'

const url = "http://localhost:8000/";

const collectionStyles = {
  root: {
    width:'100%',
    height:'100%'

  },
  gridList: {
    margin:0,
    marginTop:2,
    width:'100%',
    height:'100%',
  },
  table: {
    // maxHeight:'calc(100vh - 114px)',

  },
  artistTile: {
    root:{
    },
    img:{
      maxHeight:'calc(100vw/8)',
      maxWidth: 'calc(100vw/8)',
      minHeight:100,
      minWidth: 100
    },
  },
  href: {
    color:'white'
  }
};


export default class AlbumsCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderAlbumTiles(albums) {
    if (albums) {
      let arr = albums.map((tile) => (
            <Tile
              tileKey={'albumTile_'+ tile.id}
              title={tile.name}
              subtitle={tile.artist.name}
              imgURL={tile.artwork ? tile.artwork : url+'static/images/default-artwork.png'}
              tracks={tile.tracks}
              select={this.props.select}
              selectedTracks={this.props.selectedTracks}
              id={tile.id}
              dispatch={this.props.dispatch}/>

      ))
      return arr;
    }
  }
  renderGrid (cols) {
    const {albums} = this.props;
    if(albums){
    return(
      <div style={collectionStyles.root}>
      <GridList
        cols={cols}
        // cellHeight={'auto'}
        style={collectionStyles.gridList}>
        {this.renderAlbumTiles(albums.results)}
        </GridList>
      </div>
    );
  }
  }
  render() {
    const {albums} = this.props;
    return(
      <div>
         <MediaQuery query='(min-device-width: 560px)'>
            <MediaQuery query='(max-width: 59px)'>
               {this.renderGrid(2)}
            </MediaQuery>
            <MediaQuery query='(min-width: 560px)'>
               {this.renderGrid(8)}
            </MediaQuery>
         </MediaQuery>
         <MediaQuery query='(max-device-width: 559px)'>
            {this.renderGrid(2)}
         </MediaQuery>
      </div>
    );
  }
}
