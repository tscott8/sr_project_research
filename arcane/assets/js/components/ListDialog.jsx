import React, { Component } from 'react'
import { Dialog, FloatingActionButton, FlatButton, FontIcon } from 'material-ui'
import { TracksCollection } from './Collections'

const styles = {
   fab: {
      float: 'right'
   }
}

export default class ListDialog extends Component {
   constructor(props) {
      super(props);
   }

   renderDialogTitle() {
      const { name, tracks } = this.props;
      if (tracks.results) {
         return (
            <div>
               <h3>{tracks.results[0].album.name}</h3>
               <FloatingActionButton style={styles.fab}>
                  <FontIcon className="material-icons">play_arrow</FontIcon>
               </FloatingActionButton>
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
      return (
         <Dialog
            open={this.props.open}
            title={this.renderDialogTitle()}
            onRequestClose={this.props.onClose}
            autoDetectWindowHeight={true}
            autoScrollBodyContent={true}
            action={<FlatButton
                       label="Cancel"
                       primary={true}
                       onTouchTap={this.props.onClose}
                     />}>
            <TracksCollection select={this.props.select} selectedTracks={this.props.selected} tracks={this.props.tracks} />
         </Dialog>
      );
   }
}
