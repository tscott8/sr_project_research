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


export default class ArtistsCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderArtistTiles(artists) {
    if (artists) {
      let arr = artists.map((tile) => (
        <GridTile
          key={'artistTile_'+ tile.id}
          cols={1}
          rows={1}
          className="boxTile"

          >
            <Tile
              title={tile.name}
              subtitle={tile.genre.name}
              imgURL={tile.cover_photo ? tile.cover_photo : url+'static/images/default-avatar.png'}
              albums={tile.albums}
              select={this.props.select}
              selectedTracks={this.props.selectedTracks}
              id={tile.id}
              dispatch={this.props.dispatch}
              type={'artist'}/>
            </GridTile>

      ))
      return arr;
    }
  }
  renderGrid (cols) {
    const {artists} = this.props;
    if(artists){
    return(
      <div style={collectionStyles.root}>
      <GridList
        cols={cols}
        // cellHeight={'auto'}
        style={collectionStyles.gridList}>
        {this.renderArtistTiles(artists.results)}
        </GridList>
      </div>
    );
  }
  }
  render() {
    const {artists} = this.props;
    return(
      <div>
         <MediaQuery query='(min-device-width: 560px)'>
            <MediaQuery query='(max-width: 559px)'>
               {this.renderGrid(4)}
            </MediaQuery>
            <MediaQuery query='(min-width: 560px)'>
               {this.renderGrid(8)}
            </MediaQuery>
         </MediaQuery>
         <MediaQuery query='(max-device-width: 559px)'>
            {this.renderGrid(4)}
         </MediaQuery>
      </div>
    );
  }
}
