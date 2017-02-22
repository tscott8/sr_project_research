import React, {Component, PropTypes} from 'react'
import {Route, DefaultRoute} from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import App from '../containers/App'
import Uploader from '../components/Uploader'
import CollectionTabs from '../components/CollectionTabs'

class RoutesContainer extends Component {
   constructor(props) {
     super(props);

   }
   render() {
      const { genres, tracks, artists, albums, actions } = this.props;
      return (
         <Route path="/browse/test/" component={App} >
            <Route path="upload" component={Uploader} />
            <Route path="collections">
               <CollectionTabs genres={genres}
                  tracks={tracks}
                  artists={artists}
                  albums={albums}
                  actions={actions}/>
            </Route>
         </Route>);
   }
}

RoutesContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  genres: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  albums: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    genres: state.genres,
    tracks: state.tracks,
    artists: state.artists,
    albums: state.albums,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      genreActions: bindActionCreators(GenreActions, dispatch),
      trackActions: bindActionCreators(TrackActions, dispatch),
      artistActions: bindActionCreators(ArtistActions, dispatch),
      albumActions: bindActionCreators(AlbumActions, dispatch)
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(RoutesContainer);
