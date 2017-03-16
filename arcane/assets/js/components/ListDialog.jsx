import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Dialog, FloatingActionButton, FlatButton, FontIcon, Subheader,Avatar, ListItem, IconButton} from 'material-ui'
import{ CardTitle} from 'material-ui/Card'
import TracksCollection  from './TracksCollection'
import AlbumsCollection  from './AlbumsCollection'
import ArtistsCollection  from './ArtistsCollection'

import * as TrackActions from '../actions/TrackActions'
import * as AlbumActions from '../actions/AlbumActions'
import * as ArtistActions from '../actions/ArtistActions'
import sortBy from 'lodash/sortBy';


const styles = {
   fab: {
      bottom:10,
      right:15,
      position:'absolute',
      zIndex:1
   },
   title: {
    bottom:25,
    whiteSpace:'no-wrap',
    overflow:'hidden',
    textOverflow:'clip',
    left:15,
    position:'absolute',
    textShadow:'1px 1px black',

   },
   subtitle: {
     bottom:0,
     whiteSpace:'no-wrap',
     overflow:'hidden',
     textOverflow:'clip',
     left:15,
     position:'absolute',
     textShadow:'1px 1px black',
   }
}

class ListDialog extends Component {
   constructor(props) {
      super(props);
   }

   renderDialogTitle(title, subtitle) {
         return (
              <CardTitle
                style={{padding:0, margin:0, paddingTop:160}}
                titleStyle={styles.title}
                subtitleStyle={styles.subtitle}

                title={title}
                subtitle={subtitle}>
                <FloatingActionButton
                  style={styles.fab}
                  >
                  <FontIcon className="material-icons">play_arrow</FontIcon>
                </FloatingActionButton>
              </CardTitle>

         );
   }
   renderContent() {
     const {type, tracks, albums, artists, genres, select, selectedTracks, dispatch} = this.props;
     if (type === "album") {
       return (
         <TracksCollection
           tracks={tracks.albumTracks}
           select={select}
           selectedTracks={selectedTracks}
           noArt={true}
         />
       );
     }
    if (type === "artist") {
      return (
        <AlbumsCollection
          albums={albums.artistAlbums}
          select={select}
          selectedTracks={selectedTracks}
          dispatch={dispatch}
          cols={4}
        />
      );
    }
    if (type === "genre") {
      return (
        <ArtistsCollection
          artists={artists.genreArtists}
          select={select}
          selectedTracks={selectedTracks}
          dispatch={dispatch}
          cols={4}
        />
      );
    }
   }
   render() {
     const {tracks, albums, genres, title, subtitle, imgURL, open, onClose } = this.props;
     if(tracks || albums || genres) {
      return (
         <Dialog
           //  contentStyle={{maxHeight:'80vh'}}
           titleStyle={{padding:0,background: 'linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url('+ imgURL + ') ',
             backgroundSize: 'cover',
             backgroundPosition:'center center',
             overflow:'hidden',
             textShadow:'1px 1px black',
             //  height:250,
           }}
           bodyStyle={{padding:0,margin:0, width:'100%', overflowX:'hidden'}}
           open={open}
           title={this.renderDialogTitle(title, subtitle)}
           onRequestClose={onClose}
           autoDetectWindowHeight={true}
           autoScrollBodyContent={true}
           //  actions={<FlatButton
           //  label="Cancel"
           //  primary={true}
           //  onTouchTap={onClose}/>}
         >
           {this.renderContent()}

         </Dialog>
      );
   }
 }
}


ListDialog.propTypes = {
   dispatch: PropTypes.func.isRequired,
   tracks:   PropTypes.object.isRequired,
   albums:   PropTypes.object.isRequired,
   artists:  PropTypes.object.isRequired
}

function mapStateToProps(state) {
   const { tracks, albums, artists} = state
   return { tracks, albums, artists };
}

export default connect(mapStateToProps)(ListDialog);
