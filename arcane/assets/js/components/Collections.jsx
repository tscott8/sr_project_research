import React, {Component, PropTypes} from 'react';
import {GridTile, GridList} from 'material-ui'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import MenuTile from './MenuTile'
import SquareButton from './SquareButton'


const url = "http://localhost:8000/";

const collectionStyles = {
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflowY:'auto',
    width:'100%',
    height:'auto',
    padding:3,
    maxHeight:'70vh'
  },
  gridList: {
    width:'100%',
  },
  table: {
    overflowY:'auto'
  },
  href:{
    color:'red'
  },
  artistTile: {
    root:{
    },
    img:{
      maxHeight:200
    },
  }
};
export class GenresCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderGenreTiles(genres) {
    if (genres) {
      let arr = genres.map((tile) => (
        <GridTile
          key={'genreTile_'+ tile.id}>
          <SquareButton
            key={"genreMenuTile_" + tile.id}
            name={tile.name}
            icon={tile.icon ? tile.icon : 'build'}
            url={tile.url ? tile.url : ''}
            onClick={this.props.onClick}/>
        </GridTile>
      ))
      return arr;
    }
  }
  render() {
    const {genres} = this.props;
    return(
      <div style={collectionStyles.root}>
        <GridList
          cols={6}
          cellHeight={'auto'}
          style={collectionStyles.gridList}>
          {this.renderGenreTiles(genres.results)}
          </GridList>
      </div>
    );
  }
}
export class TracksCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderTracks(tracks) {
    if (tracks) {
      let arr = tracks.map((track) => (
        <TableRow
          key={'trackRow_'+ track.id}>
          <TableRowColumn><a style={collectionStyles.href} href={track.url}>{ track.name }</a></TableRowColumn>
          <TableRowColumn>{track.duration }</TableRowColumn>
          <TableRowColumn><a style={collectionStyles.href} href={track.artist}>{ track.artist }</a></TableRowColumn>
          <TableRowColumn><a style={collectionStyles.href} href={track.album}>{ track.album }</a></TableRowColumn>
          <TableRowColumn><a style={collectionStyles.href} href={track.genre}>{ track.genre }</a></TableRowColumn>
          <TableRowColumn>{ track.play_count }</TableRowColumn>
        </TableRow>
      ))
      return arr;
    }
  }
  render() {
    const {tracks} = this.props;
    return(
        <Table height={'65vh'} multiSelectable={true}>
          <TableHeader enableSelectAll={true}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Duration</TableHeaderColumn>
              <TableHeaderColumn>Artist</TableHeaderColumn>
              <TableHeaderColumn>Album</TableHeaderColumn>
              <TableHeaderColumn>Genre</TableHeaderColumn>
              <TableHeaderColumn>Play Count</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} style={collectionStyles.tbody} showRowHover={true}>
              {this.renderTracks(tracks.results)}
          </TableBody>
        </Table>
    );
  }
}
export class ArtistsCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderArtistTiles(artists) {
    if (artists) {
      let arr = artists.map((tile) => (
        <GridTile
          key={'artistTile_'+ tile.id}
          title={tile.name}
          subtitle={tile.genre}
          cols={1}
          rows={1}
          style={collectionStyles.artistTile.root}
          >
          <img style={collectionStyles.artistTile.img} src={tile.cover_photo ? tile.cover_photo : url+'static/images/3.jpg'}/>
        </GridTile>
      ))
      return arr;
    }
  }
  render() {
    const {artists} = this.props;
    return(
      <div style={collectionStyles.root}>
      <GridList
        cols={6}
        cellHeight={'auto'}
        style={collectionStyles.gridList}>
        {this.renderArtistTiles(artists.results)}
        </GridList>
      </div>
    );
  }
}

export class AlbumsCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderAlbumTiles(albums) {
    if (albums) {
      let arr = albums.map((tile) => (
        <GridTile
          key={'albumTile_'+ tile.id}
          title={tile.name}
          subtitle={tile.genre}
          cols={1}
          rows={1}
          style={collectionStyles.artistTile.root}
          >
          <img style={collectionStyles.artistTile.img} src={tile.cover_photo ? tile.cover_photo : url+'static/images/3.jpg'}/>
        </GridTile>
      ))
      return arr;
    }
  }
  render() {
    const {albums} = this.props;
    return(
      <div style={collectionStyles.root}>
      <GridList
        cols={6}
        cellHeight={'auto'}
        style={collectionStyles.gridList}>
        {this.renderAlbumTiles(albums.results)}
        </GridList>
      </div>
    );
  }
}
