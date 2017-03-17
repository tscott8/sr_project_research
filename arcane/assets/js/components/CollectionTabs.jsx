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
    padding: 0,
    height:'calc(100vh - 114px)',
    maxWidth:'100vw'
  },
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
    // const { dispatch } = this.props;
    // switch (value) {
    //   case 0:
    //     dispatch(GenreActions.getGenres());
    //   case 1:
    //     dispatch(ArtistActions.getArtists());
    //   case 2:
    //     dispatch(AlbumActions.getAlbums());
    //   case 3:
    //     dispatch(TrackActions.getTracks());
    //     break;
    //   default:
    //     break;
    //
    // }

  };
  // sortByTag (prop, arr) {
  //   prop = prop.split('.');
  //   var len = prop.length;
  //
  //   arr.sort(function (a, b) {
  //       var i = 0;
  //       while( i < len ) { a = a[prop[i]]; b = b[prop[i]]; i++; }
  //       if (a < b) {
  //           return -1;
  //       } else if (a > b) {
  //           return 1;
  //       } else {
  //           return 0;
  //       }
  //   });
  //   return arr;
  // }
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
    const {tracks, artists, albums, genres, select, selectedTracks, dispatch} = this.props;
    let contents = [
      <GenresCollection select={select} selectedTracks={selectedTracks} genres={genres} dispatch={dispatch} cols={8}/>,
      <ArtistsCollection select={select} selectedTracks={selectedTracks} artists={artists.allArtists} dispatch={dispatch} cols={8}/>,
      <AlbumsCollection select={select} selectedTracks={selectedTracks} albums={albums.allAlbums} dispatch={dispatch} cols={8}/>,
      <TracksCollection select={select} selectedTracks={selectedTracks} tracks={tracks.allTracks} dispatch={dispatch} />,
    ];
    return contents[index];
  }
  renderSlides() {
    let contents = [0,1,2,3];
    let slides = contents.map((slide) => (
      <div
        id={'collection_slide_content_'+slide}
        key={'collection_slide_content_'+slide}
        style={styles.slide}>
        {this.renderSlide(slide)}
      </div>
    ))
    return slides;
  }
  render() {
    return (
      <div>
        <Tabs
          id={"collection_tabs_header"}
          onChange={this.handleChange}
          value={this.state.slideIndex}>
          {this.renderTabs()}
        </Tabs>
        <div style={{overflowY:'auto', overflowX:'hidden', height:'calc(100vh - 114px)'}}>
          <div id={'collection_slide_content_'+this.state.slideIndex} style={styles.slide}>
            {this.renderSlide(this.state.slideIndex)}
          </div>
        </div>
        {/* <SwipeableViews
          id={'collection_swipe_views'}
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
          {this.renderSlides()}
        </SwipeableViews> */}
      </div>
    );
  }
}
