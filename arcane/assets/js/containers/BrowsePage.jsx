import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// import AlbumCarousel from '../components/AlbumCarousel'
import * as GenreActions from '../actions/GenreActions'
import * as TrackActions from '../actions/TrackActions'
import * as ArtistActions from '../actions/ArtistActions'
import * as AlbumActions from '../actions/AlbumActions'
import BrowseCarousel from '../components/BrowseCarousel'
import {Paper} from 'material-ui'
class BrowsePage extends Component {
   constructor(props) {
      super(props);
      this.state = { selected: [], snackOpen:false, snackMessage: 'Added nada!' };
      const { dispatch } = this.props;
      dispatch(TrackActions.getTracks());
      dispatch(AlbumActions.getAlbums());
      dispatch(ArtistActions.getArtists());
      dispatch(GenreActions.getGenres());
   }
   addToSelected(items) {
     // console.log('selected items:', items)
     this.setState({
       selected: items
     });
   }
   render() {
     const { genres, tracks, artists, albums } = this.props;

      // console.info("ablums in browse render: ", this.props.albums);
      return (
         <div style={{
           maxHeight:'calc(100vh-64px)',
           overflowY:'auto',
           maxWidth:'90%',
           marginLeft:'auto',
           marginRight:'auto'
         }}>
           {/* <h3>New Releases</h3> */}
           {/* <h3>Test Carousel with Tiles</h3>
           <AlbumCarousel albums={albums} dispatch={this.props.dispatch} /> */}
           <h3>Genres</h3>
           <BrowseCarousel
             {...this.props}
             list={genres}
             select={this.addToSelected.bind(this)}
             selectedTracks={this.state.selected}
             type={'genre'}
           />

           <h3>Artists</h3>
           <BrowseCarousel
             {...this.props}
             list={artists.allArtists}
             select={this.addToSelected.bind(this)}
             selectedTracks={this.state.selected}
             type={'artist'}
           />
           <h3>Albums</h3>
           <BrowseCarousel
             {...this.props}
             list={albums.allAlbums}
             select={this.addToSelected.bind(this)}
             selectedTracks={this.state.selected}
             type={'album'}
           />
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
