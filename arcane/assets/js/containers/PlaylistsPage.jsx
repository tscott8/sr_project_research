import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Paper } from 'material-ui'
import theme from '../constants/material-ui-theme'

import * as PlaylistActions from '../actions/PlaylistActions'

const styles = {
   paper: {
      backgroundColor: theme.palette.primary3Color
   },
}

class PlaylistsPage extends Component {
   constructor(props) {
      super(props);

      const { dispatch } = this.props;
      dispatch(PlaylistActions.getUserPlaylists());
   }

   render() {
      return (
         <div>
            <Paper style={styles.paper}>
               <h3>Playlists Page</h3>
            </Paper>
         </div>
      );
   }
}

PlaylistsPage.propTypes = {
   dispatch: PropTypes.func.isRequired,
   playlists: PropTypes.object.isRequired
}

function mapStateToProps(state) {
   const { playlists } = state;
   return { playlists };
}

export default connect(mapStateToProps)(PlaylistsPage);
