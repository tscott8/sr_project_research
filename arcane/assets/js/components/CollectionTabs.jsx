import React, {Component, PropTypes} from 'react';
import {Paper, GridTile,GridList} from 'material-ui'
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import MenuTile from './MenuTile'

const url = "http://localhost:8000/";

const collectionStyles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    overflowY:'auto'
  },
  gridList: {
    margin:5,
    height:'100%',
    width: '100%',
    overflowY: 'auto',
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
          <MenuTile
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
        <tr
          key={'trackRow_'+ track.id}>
          <td><a href={track.url}>{ track.name }</a></td>
          <td>{ track.album }</td>
          <td>{ track.artist }</td>
          <td>{ track.genre }</td>
        </tr>
      ))
      return arr;
    }
  }
  render() {
    const {tracks } = this.props;
    return(
      <div style={collectionStyles.root}>
        <table>
          <tbody>
            <tr>
              <th>Track</th>
              <th>Album</th>
              <th>Artist</th>
              <th>Genre</th>
            </tr>
              {this.renderTracks(tracks.results)}
            </tbody>
        </table>
      </div>
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
  root: {
    margin:10
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
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
      <Paper style={styles.root}>
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
