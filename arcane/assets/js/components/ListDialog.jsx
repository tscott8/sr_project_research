import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Dialog, FloatingActionButton, FlatButton, FontIcon, Subheader } from 'material-ui'
import{ CardTitle} from 'material-ui/Card'
import TracksCollection  from './TracksCollection'
import * as TrackActions from '../actions/TrackActions'

const styles = {
   fab: {
      float: 'right',
      top:0,
      right:0,
      position:'absolute',
      margin:20,
      zIndex:1
   }
}

class ListDialog extends Component {
   constructor(props) {
      super(props);
      const { tracks } = this.props;
      this.state= {albumTracks: tracks.albumTracks};
   }

   component


   renderDialogTitle(tracks, name) {
      console.log('in renderDialogTitle', tracks)
      if (tracks && tracks.results) {
         return (
            <div>
              <FloatingActionButton style={styles.fab}>
                <FontIcon className="material-icons">play_arrow</FontIcon>
              </FloatingActionButton>
              <CardTitle style={{padding:0}} title={name} />
            </div>
         );
      } else {
         return (
            <div>
               <h3>{name}</h3>
               <FloatingActionButton style={styles.fab}>
                  <FontIcon className="material-icons">play_arrow</FontIcon>
               </FloatingActionButton>
            </div>
         );
      }

   }

   render() {
     const {tracks, name} = this.props;
     console.log('in render for ListDialog', tracks)
      return (
         <Dialog
           bodyStyle={{padding:0, margin:0}}
           open={this.props.open}
           title={this.renderDialogTitle(tracks, name)}
           onRequestClose={this.props.onClose}
           autoDetectWindowHeight={true}
           autoScrollBodyContent={true}
          //  actions={<FlatButton
                      //  label="Cancel"
                      //  primary={true}
                      //  onTouchTap={this.props.onClose}/>}
           >
           <TracksCollection
             tracks={this.props.tracks.albumTracks}
             select={this.props.select}
             selectedTracks={this.props.selectedTracks}/>
         </Dialog>
      );
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
