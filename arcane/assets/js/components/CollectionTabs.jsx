import React, {Component, PropTypes} from 'react';
import {Paper} from 'material-ui'
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {GenresCollection, ArtistsCollection, AlbumsCollection, TracksCollection} from './Collections'

const styles = {
  paper: {
    margin:10
  },
  tabs: {
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
      slideIndex: 3,
      renderCount: false
    };

  }
  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
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
    let contents = [
      <GenresCollection genres={this.props.genres}/>,
      <ArtistsCollection artists={this.props.artists}/>,
      <AlbumsCollection albums={this.props.albums}/>,
      <TracksCollection tracks={this.props.tracks}/>,
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
      <Paper style={styles.paper}>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}>
          {this.renderTabs()}
        </Tabs>

        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
          {this.renderSlides()}
      </SwipeableViews>
      </Paper>
    );
  }
}
