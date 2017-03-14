import React, {Component, PropTypes} from 'react';
import {Paper} from 'material-ui'
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import GenresCollection from './GenresCollection'
import TracksCollection from './TracksCollection'
import AlbumsCollection from './AlbumsCollection'
import ArtistsCollection from './ArtistsCollection'
import * as GenreActions from '../actions/GenreActions'
import * as TrackActions from '../actions/TrackActions'
import * as ArtistActions from '../actions/ArtistActions'
import * as AlbumActions from '../actions/AlbumActions'

const styles = {
  root: {
    margin:'auto',
    maxHeight:'85vh',
    maxWidth:'80vw',
    marginTop:10,

  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding:0,
    // maxHeight: 'inherit'
    maxHeight:'calc(100vh - 114px)',
    maxWidth:'100vw'
  },
  swipes: {
    // maxWidth:'100vw'

    // maxHeight:'calc(100vh - 114px)',
  }
};
export default class CollectionTabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 2,
      renderCount: false
    };
    const { dispatch } = this.props;
    dispatch(TrackActions.getTracks());
    dispatch(AlbumActions.getAlbums());
    dispatch(ArtistActions.getArtists());
    dispatch(GenreActions.getGenres());

  }
  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
  sortByTag (prop, arr) {
    prop = prop.split('.');
    var len = prop.length;

    arr.sort(function (a, b) {
        var i = 0;
        while( i < len ) { a = a[prop[i]]; b = b[prop[i]]; i++; }
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    });
    return arr;
  }
  renderCount(countIndex) {
    const {genres,artists,albums,tracks} = this.props;
    let counts = [
      genres.count > 0 ? '['+genres.count+']' : '',
      artists.count > 0 ? '['+artists.count+']' : '',
      albums.count > 0 ? '['+albums.count+']' : '',
      tracks.count > 0 ? '['+tracks.count+']' : '',
    ];
    return this.state.renderCount ? counts[countIndex] : '';
  }

  renderTabs() {
    let contents = [
      {index: 0, label: "Genres " + this.renderCount(0)},
      {index: 1, label: "Artists " + this.renderCount(1)},
      {index: 2, label: "Albums " + this.renderCount(2)},
      {index: 3, label: "Songs " + this.renderCount(3)},
  ];
  let tabs = contents.map((tab) => (
      <Tab
        key={tab.index}
        label={tab.label}
        value={tab.index}/>
  ))
  return tabs;
  }
  renderSlide(index) {
    const {tracks, artists, albums, genres} = this.props;
    const sortedTracks = tracks.allTracks.results ? this.sortByTag('name', tracks.allTracks.results) : [];
    const sortedAlbums = albums.allAlbums.results ? this.sortByTag('name', albums.allAlbums.results) : [];
    const sortedArtists = artists.allArtists.results ? this.sortByTag('name', artists.allArtists.results) : [];
    const sortedGenres = genres.results ? this.sortByTag('name', genres.results) : [];

    let contents = [
      <GenresCollection select={this.props.select} selectedTracks={this.props.selectedTracks} genres={this.props.genres} dispatch={this.props.dispatch}   cols={8}/>,
      <ArtistsCollection select={this.props.select} selectedTracks={this.props.selectedTracks} artists={this.props.artists.allArtists} dispatch={this.props.dispatch} cols={8}/>,
      <AlbumsCollection select={this.props.select} selectedTracks={this.props.selectedTracks} albums={this.props.albums.allAlbums} dispatch={this.props.dispatch} cols={8}/>,
      <TracksCollection select={this.props.select} selectedTracks={this.props.selectedTracks} tracks={this.props.tracks.allTracks}/>,
    ];
    return contents[index];
  }
  renderSlides() {
    let contents = [0,1,2,3];
    let slides = contents.map((slide) => (
      <div  key ={slide} style={styles.slide}>
        {this.renderSlide(slide)}
      </div>
    ))
    return slides;
  }
  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}>
          {this.renderTabs()}
        </Tabs>

        <SwipeableViews
          style={styles.swipes}
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
          {this.renderSlides()}
        </SwipeableViews>
      </div>
    );
  }
}
