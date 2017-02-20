import React, {Component, PropTypes} from 'react';
import {Paper, GridTile,GridList,Divider} from 'material-ui'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import MenuTile from './MenuTile'
import SquareButton from './SquareButton'

const url = "http://localhost:8000/";

const collectionStyles = {
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflowY:'scroll',
    width:'100%',
    height:'auto',
    padding:3,
    maxHeight:'70vh'
  },
  gridList: {
    width:'100%',
    overflowY: 'scroll',
  },
  table: {
    overflowY:'scroll'
  },
  artistTile: {
    root:{
    },
    img:{
      maxHeight:'200'
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
  convertDuration(duration) {
    return '1:20';
  }
  renderTracks(tracks) {
    if (tracks) {
      let arr = tracks.map((track) => (
        <TableRow
          key={'trackRow_'+ track.id}>
          <TableRowColumn><a href={track.url}>{ track.name }</a></TableRowColumn>
          <TableRowColumn>{track.duration }</TableRowColumn>
          <TableRowColumn><a href={track.artist}>{ track.artist }</a></TableRowColumn>
          <TableRowColumn><a href={track.album}>{ track.album }</a></TableRowColumn>
          <TableRowColumn><a href={track.genre}>{ track.genre }</a></TableRowColumn>
          <TableRowColumn>{ track.play_count }</TableRowColumn>
        </TableRow>
      ))
      return arr;
    }
  }
  render() {
    const {tracks } = this.props;
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
const styles = {

  tabs:{
    overflowY:'auto',
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 0,
  },
};
export default class CollectionTabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <Paper style={styles.paper}
        zDepth={5}>

        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Genres" value={0} />
          <Tab label="Artists" value={1} />
          <Tab label="Albums" value={2} />
          <Tab label="Songs" value={3} />
          <Tab label="Playlists" value={4} />
          <Tab label="Stations" value={5} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div style={styles.slide}>
            <GenresCollection genres={this.props.genres}/>
          </div>
          <div style={styles.slide}>
            <ArtistsCollection artists={this.props.artists}/>
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
          <div style={styles.slide}>
            <TracksCollection tracks={this.props.tracks}/>
          </div>
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
        </SwipeableViews>
      </Paper>
    );
  }
}
