import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AlbumActions from '../actions/AlbumActions'
import AlbumCarousel from '../components/AlbumCarousel'


class BrowsePage extends Component {
   constructor(props) {
      super(props);
      const {dispatch, albums} = this.props;
      dispatch(AlbumActions.getAlbums());
   }

   render() {
      console.info("ablums in browse render: ", this.props.albums);
      return (
         <div>
            <h3>New Releases</h3>
            <AlbumCarousel list={this.props.albums} />
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

   return { albums }
}

export default connect(mapStateToProps)(BrowsePage);
