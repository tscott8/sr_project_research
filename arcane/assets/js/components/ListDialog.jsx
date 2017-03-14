import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Dialog, FloatingActionButton, FlatButton, FontIcon, Subheader,Avatar, ListItem, IconButton} from 'material-ui'
import{ CardTitle} from 'material-ui/Card'
import TracksCollection  from './TracksCollection'
import AlbumsCollection  from './AlbumsCollection'
import * as TrackActions from '../actions/TrackActions'
import * as AlbumActions from '../actions/AlbumActions'


const styles = {
   fab: {
      // float: 'right',
      bottom:10,
      right:15,
      position:'absolute',
      zIndex:1
   },
   title: {
    //  float: 'left',
    bottom:25,
    // maxWidth:'75%',
    whiteSpace:'no-wrap',
    overflow:'hidden',
    textOverflow:'clip',
    left:15,
    position:'absolute',
    textShadow:'1px 1px black',

   },
   subtitle: {
     bottom:0,
    //  maxWidth:'50%',
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
      // const { dispatch } = this.props;
      // dispatch(TrackActions.getAlbumTracks(this.props.id));
      // const { tracks } = this.props;
      // this.state= {albumTracks: tracks.albumTracks};
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
     const {type, tracks, albums} = this.props;
     if (type === "album") {
       return (
         <TracksCollection
           tracks={this.props.tracks.albumTracks}
           select={this.props.select}
           selectedTracks={this.props.selectedTracks}
           noArt={true}
        />
       );
     }
    if (type === "artist") {
      return (
        <AlbumsCollection
          albums={this.props.albums.artistAlbums}
          select={this.props.select}
          selectedTracks={this.props.selectedTracks}
          dispatch={this.props.dispatch}
          cols={4}
       />
      );
    }
   }
   render() {
     const {tracks, albums, title, subtitle, imgURL} = this.props;
     if(tracks || albums) {
      return (
         <Dialog
           //  contentStyle={{maxHeight:'80vh'}}
           titleStyle={{padding:0,background: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('+ imgURL + ') ',
             backgroundSize: 'cover',
             backgroundPosition:'center center',
             overflow:'hidden',
             textShadow:'1px 1px black',
             //  height:250,
           }}
           bodyStyle={{padding:0,margin:0, width:'100%', overflowX:'hidden'}}
           open={this.props.open}
           title={this.renderDialogTitle(title, subtitle)}
           onRequestClose={this.props.onClose}
           autoDetectWindowHeight={true}
           autoScrollBodyContent={true}
          //  actions={<FlatButton
                      //  label="Cancel"
                      //  primary={true}
                      //  onTouchTap={this.props.onClose}/>}
           >
             {this.renderContent()}

         </Dialog>
      );
   }
 }
}


ListDialog.propTypes = {
   dispatch: PropTypes.func.isRequired,
   tracks: PropTypes.object.isRequired,
   albums: PropTypes.object.isRequired

}

function mapStateToProps(state) {
   const { tracks, albums } = state
   return { tracks, albums };
}

export default connect(mapStateToProps)(ListDialog);
