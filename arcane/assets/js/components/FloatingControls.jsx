import React, { Component, PropTypes } from 'react'
import { FloatingActionButton, FontIcon, CircularProgress } from 'material-ui'
import { redA700 } from 'material-ui/styles/colors'
import * as ActionTypes from '../constants/ActionTypes'

const style = {
  fab: {
   position: 'absolute',
   right: '0',
   bottom: '0',
   marginBottom: '5vh',
   marginRight: '5vh'
 },

   progress: {
      position: 'absolute',
      right: '0',
      bottom: '0',
      MsTransform: 'rotate(-90deg)',
      WebkitTransform: 'rotate(-90deg)',
      transform: 'rotate(-90deg)'
   }
}

export default class FloatingControls extends Component {
   constructor(props) {
      super(props);
   }

  //  renderAddQueueButton() {
  //    if (this.state.selected) {
  //      return(
  //        <FloatingActionButton onClick={this.props.pushToQueue} style={style.left} >
  //          <FontIcon className="material-icons">queue</FontIcon>
  //        </FloatingActionButton>
  //      );
  //    }
  //  }
   render() {
      return (

        <div>
          <FloatingActionButton onClick={this.props.onPlay} style={style.fab} >
           <FontIcon className="material-icons">{this.props.isPlaying ? "pause" : "play_arrow"}</FontIcon>
           <CircularProgress
             mode="determinate"
             value={this.props.percent * 100}
             size={57}
             thickness={3}
             style={style.progress}
             color={redA700} />
         </FloatingActionButton>
         {/* {this.renderAddQueueButton()} */}
       </div>
      );
   }
}
