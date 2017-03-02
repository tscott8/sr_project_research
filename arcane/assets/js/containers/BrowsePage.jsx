import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AlbumCarousel from '../components/AlbumCarousel'
import * as AlbumActions from '../actions/AlbumActions'


class BrowsePage extends Component {
   constructor(props) {
      super(props);
      const { dispatch } = this.props;
      dispatch(AlbumActions.getAlbums());
   }

   render() {
     const { genres, tracks, artists, albums } = this.props;

      console.info("ablums in browse render: ", this.props.albums);
      return (
         <div>
            <h3>New Releases</h3>
            <AlbumCarousel albums={albums} />
         </div>
      );
   }
}

BrowsePage.propTypes = {
   dispatch: PropTypes.func.isRequired,
   albums: PropTypes.object.isRequired
}

function mapStateToProps(state) {
   const { albums } = state

   return { albums };
}

export default connect(mapStateToProps)(BrowsePage);
