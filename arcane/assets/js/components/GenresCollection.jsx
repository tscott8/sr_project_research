import React, {Component} from 'react';
import {GridTile, GridList,FontIcon} from 'material-ui'
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
export default class GenresCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderGenreTiles(genres) {
    if (genres) {
      let arr = genres.map((tile) => (
        <GridTile
          cols={1}
          rows={1}
          key={'genreTile_'+ tile.id}>
          <Tile
            title={tile.name}
            // subtitle={tile.artist.name}
            imgURL={tile.icon ? tile.icon : <FontIcon className='material-icons'>build</FontIcon>}
            artists={tile.artists}
            select={this.props.select}
            selectedTracks={this.props.selectedTracks}
            id={tile.id}
            dispatch={this.props.dispatch}
            type={'genre'}/>
        </GridTile>
      ))
      return arr;
    }
  }
  render() {
    const {genres} = this.props;
    return(
        <GridList
          cols={8}
          // cellHeight={'auto'}
          style={collectionStyles.gridList}>
          {this.renderGenreTiles(genres.results)}
        </GridList>
    );
  }
}
