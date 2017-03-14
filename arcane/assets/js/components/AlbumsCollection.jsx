import React, {Component} from 'react';
import {GridTile, GridList} from 'material-ui'
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
};


export default class AlbumsCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderAlbumTiles(albums) {
    if (albums) {
      let arr = albums.map((tile) => (
        <GridTile
          key={'albumTile_'+ tile.id}
          cols={1}
          rows={1}
          className="boxTile"
        >
          <Tile
            title={tile.name}
            subtitle={tile.artist.name}
            imgURL={tile.artwork ? tile.artwork : url+'static/images/default-artwork.png'}
            tracks={tile.tracks}
            select={this.props.select}
            selectedTracks={this.props.selectedTracks}
            id={tile.id}
            dispatch={this.props.dispatch}
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
    return(
      <div>
        <MediaQuery query='(min-device-width: 560px)'>
          <MediaQuery query='(max-width: 559px)'>
            {this.renderGrid(this.props.cols/2)}
          </MediaQuery>
          <MediaQuery query='(min-width: 560px)'>
            {this.renderGrid(this.props.cols)}
          </MediaQuery>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 559px)'>
          {this.renderGrid(this.props.cols/2)}
         </MediaQuery>
      </div>
    );
  }
}
