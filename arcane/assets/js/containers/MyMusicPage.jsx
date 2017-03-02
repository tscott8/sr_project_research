import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CollectionTabs  from '../components/CollectionTabs'

import * as GenreActions from '../actions/GenreActions'
import * as TrackActions from '../actions/TrackActions'
import * as ArtistActions from '../actions/ArtistActions'
import * as AlbumActions from '../actions/AlbumActions'

class MyMusic extends Component {

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    console.log(this.props)
    dispatch(TrackActions.getTracks());
    dispatch(AlbumActions.getAlbums());
    dispatch(ArtistActions.getArtists());
    dispatch(GenreActions.getGenres());
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
               />
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
  return { genres, artists, albums, tracks };
}

export default connect(mapStateToProps)(MyMusic);
