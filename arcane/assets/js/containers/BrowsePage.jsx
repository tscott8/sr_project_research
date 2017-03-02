import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AlbumCarousel from '../components/AlbumCarousel'
import * as GenreActions from '../actions/GenreActions'
import * as TrackActions from '../actions/TrackActions'
import * as ArtistActions from '../actions/ArtistActions'
import * as AlbumActions from '../actions/AlbumActions'
import BrowseCarousel from '../components/BrowseCarousel'

class BrowsePage extends Component {
   constructor(props) {
      super(props);
      const { dispatch } = this.props;
      dispatch(TrackActions.getTracks());
      dispatch(AlbumActions.getAlbums());
      dispatch(ArtistActions.getArtists());
      dispatch(GenreActions.getGenres());
   }

   render() {
     const { genres, tracks, artists, albums } = this.props;

      console.info("ablums in browse render: ", this.props.albums);
      return (
         <div style={{overflowY:'auto'}}>
            <h3>New Releases</h3>
            <BrowseCarousel list={albums} defaultImage={'static/images/default-artwork.png'} />
            {/* <h3>Genres</h3>
            <BrowseCarousel list={genres} defaultImage={'static/images/default-artwork.png'} /> */}
            <h3>Artists</h3>
            <BrowseCarousel list={artists} defaultImage={'static/images/default-avatar.png'} />

         </div>
      );
   }
}

BrowsePage.propTypes = {
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

export default connect(mapStateToProps)(BrowsePage);
