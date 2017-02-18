import React, {Component} from 'react';
import {Paper} from 'material-ui'
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';


export class GenresCollection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(<div>Genres Here</div>);
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
          <div>
            <GenresCollection/>
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
        </SwipeableViews>
      </Paper>
    );
  }
}
