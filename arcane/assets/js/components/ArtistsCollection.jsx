import React, {Component} from 'react';
import {GridTile, GridList} from 'material-ui'
import Tile from './Tile'
import MediaQuery from 'react-responsive'

const url = "http://localhost:8000/";

export default class ArtistsCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderArtistTiles(artists) {
    const {select, selectedTracks, dispatch} = this.props;
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
            select={select}
            selectedTracks={selectedTracks}
            id={tile.id}
            dispatch={dispatch}
            type={'artist'}
          />
        </GridTile>

      ))
      return arr;
    }
  }
  renderGrid (cols) {
    const {artists} = this.props;
    if(artists){
    return(
        <GridList
          style={{margin:0, marginTop:2, width:'100%', height:'calc(100vh-114px)', overflowY:'auto'}}
          cols={cols}>
          {this.renderArtistTiles(artists.results)}
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
