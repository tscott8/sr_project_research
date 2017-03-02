import React, { Component, PropTypes } from 'react'
import { FloatingActionButton, FontIcon } from 'material-ui'
import { connect } from 'react-redux'
import CollectionTabs  from '../components/CollectionTabs'

import * as GenreActions from '../actions/GenreActions'
import * as TrackActions from '../actions/TrackActions'
import * as ArtistActions from '../actions/ArtistActions'
import * as AlbumActions from '../actions/AlbumActions'

const style = {
  fab: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    marginBottom: '5vh',
    marginLeft: '5vh'
  },
}
class MyMusic extends Component {

  constructor(props) {
    super(props);
    this.state = { selected: [] };
    const { dispatch } = this.props;
    console.log(this.props)
    dispatch(TrackActions.getTracks());
    dispatch(AlbumActions.getAlbums());
    dispatch(ArtistActions.getArtists());
    dispatch(GenreActions.getGenres());
  }

  addToSelected(items) {
    console.log('selected items:', items)
    // let currentState = this.state.selected;
    // currentState.push(items)
    this.setState({
      selected: items
    });
  }
  pushToQueue() {
    console.log('IN PUSH TO QUEUE', this.state.selected)
    this.setState({selected:[]})
  }

  renderAddQueueButton() {
    if (this.state.selected.length > 0) {
      return(
        <FloatingActionButton onClick={this.pushToQueue.bind(this)} style={style.fab} >
          <FontIcon className="material-icons">queue</FontIcon>
        </FloatingActionButton>
      );
    }
  }

  render() {
    const { genres, tracks, artists, albums } = this.props;
      return (
        <div>
          <CollectionTabs
               genres={genres}
               tracks={tracks}
               artists={artists}
               albums={albums}
               select={this.addToSelected.bind(this)}
               />
         {this.renderAddQueueButton()}
        </div>
      );
  }
}

MyMusic.propTypes = {
  dispatch: PropTypes.func.isRequired,
  genres: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  albums: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  const {genres, artists, albums, tracks} = state
  return { genres, artists, albums, tracks};
}

export default connect(mapStateToProps)(MyMusic);
