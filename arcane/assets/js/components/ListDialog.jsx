import React, { Component } from 'react'
import { Dialog, FloatingActionButton, FlatButton, FontIcon, Subheader } from 'material-ui'
import{ CardTitle} from 'material-ui/Card'
import { TracksCollection } from './Collections'

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

export default class ListDialog extends Component {
   constructor(props) {
      super(props);
   }

   renderDialogTitle(tracks, name) {
      // const { name, tracks } = this.props;
      console.log('in renderDialogTitle', tracks)
      if (tracks && tracks.results) {
         return (
            <div>
              <FloatingActionButton style={styles.fab}>
                <FontIcon className="material-icons">play_arrow</FontIcon>
              </FloatingActionButton>
              <CardTitle style={{padding:0}} title={tracks.results[0].album.name} subtitle={tracks.results[0].artist.name}/>
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
     const {tracks, name} = this.props
     console.log('in render for ListDialog', tracks)
      return (
         <Dialog
           bodyStyle={{padding:0, margin:0}}
            open={this.props.open}
            title={this.renderDialogTitle(tracks, name)}
            onRequestClose={this.props.onClose}
            autoDetectWindowHeight={true}
            autoScrollBodyContent={true}
            action={<FlatButton
                       label="Cancel"
                       primary={true}
                       onTouchTap={this.props.onClose}
                     />}>
            <TracksCollection tracks={tracks} select={this.props.select} selectedTracks={this.props.selectedTracks} />
         </Dialog>
      );
   }
}
