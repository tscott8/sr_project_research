import React, {Component} from 'react';
import {GridTile, GridList,FontIcon} from 'material-ui'
import Tile from './Tile'
import MediaQuery from 'react-responsive'


const url = "http://localhost:8000/";

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
            imgURL={tile.icon ? tile.icon : url+'static/images/hip_hop.png'}
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
  renderGrid (cols) {
    const {genres} = this.props;
    if(genres){
    return(
        <GridList
          style={{margin:2, maxWidth:'100%', maxHeight:'100%'}}
          cols={cols}>
          {this.renderGenreTiles(genres.results)}
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
