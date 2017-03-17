import React, {Component} from 'react';
import {GridTile, GridList} from 'material-ui'
import Tile from './Tile'
import MediaQuery from 'react-responsive'

const url = "http://localhost:8000/";

export default class AlbumsCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderAlbumTiles(albums) {
    const {select, selectedTracks, dispatch} = this.props;
    if (albums) {
      let arr = albums.map((tile) => (
        <GridTile
          className="boxTile"
          key={'albumTile_'+ tile.id}
          cols={1}
          rows={1}>
          <Tile
            title={tile.name}
            subtitle={tile.artist}
            imgURL={tile.artwork ? tile.artwork : url+'static/images/default-artwork.png'}
            tracks={tile.tracks}
            select={select}
            selectedTracks={selectedTracks}
            id={tile.id}
            dispatch={dispatch}
            type={'album'}/>
        </GridTile>

      ))
      return arr;
    }
  }
  renderGrid (cols) {
    const {albums} = this.props;
    if(albums){
      return(
          <GridList
            style={{margin:2, maxWidth:'100%', maxHeight:'100%'}}
            cols={cols}>
            {this.renderAlbumTiles(albums.results)}
          </GridList>
          );
    }
  }
  render() {
    const {cols} = this.props;
    return(
      <div style={{width:'100%',height:'100%'}}>
        <MediaQuery query='(min-device-width: 560px)'>
          <MediaQuery query='(max-width: 559px)'>
            {this.renderGrid(cols/2)}
          </MediaQuery>
          <MediaQuery query='(min-width: 560px)'>
            {this.renderGrid(cols)}
          </MediaQuery>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 559px)'>
          {this.renderGrid(cols/2)}
         </MediaQuery>
      </div>
    );
  }
}
