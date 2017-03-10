import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Dialog, FloatingActionButton, FlatButton, FontIcon, Subheader,Avatar, ListItem, IconButton} from 'material-ui'
import{ CardTitle} from 'material-ui/Card'
import TracksCollection  from './TracksCollection'
import * as TrackActions from '../actions/TrackActions'

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

   renderDialogTitle(tracks, title, subtitle) {
      if (tracks && tracks.results) {
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
      } else {
         return (
            <div style={{paddingTop:160}}>
               <h3>{title}</h3>
               <FloatingActionButton style={styles.fab}>
                  <FontIcon className="material-icons">play_arrow</FontIcon>
               </FloatingActionButton>
            </div>
         );
      }

   }

   render() {
     const {tracks, title, subtitle, imgURL} = this.props;
     if(tracks) {
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
           bodyStyle={{padding:0,margin:0, maxWidth:'100%'}}
           open={this.props.open}
           title={this.renderDialogTitle(tracks.albumTracks, title, subtitle)}
           onRequestClose={this.props.onClose}
           autoDetectWindowHeight={true}
           autoScrollBodyContent={true}
          //  actions={<FlatButton
                      //  label="Cancel"
                      //  primary={true}
                      //  onTouchTap={this.props.onClose}/>}
           >
           <TracksCollection
             tracks={tracks.albumTracks}
             select={this.props.select}
             selectedTracks={this.props.selectedTracks}
             noArt={true}
          />
         </Dialog>
      );
   }
 }
}


ListDialog.propTypes = {
   dispatch: PropTypes.func.isRequired,
   tracks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
   const { tracks } = state
   return { tracks };
}

export default connect(mapStateToProps)(ListDialog);
