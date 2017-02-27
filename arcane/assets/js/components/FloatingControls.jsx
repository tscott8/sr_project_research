import React, { Component, PropTypes } from 'react'
import { FloatingActionButton, FontIcon } from 'material-ui'
import * as ActionTypes from '../constants/ActionTypes'

const style = {
   position: 'absolute',
   right: '0',
   bottom: '0',
   marginBottom: '5vh',
   marginRight: '5vh'
}


export default class FloatingControls extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fabIcon: 'play_arrow',
         fabFunction: this.play
      };
   }

   pause() {
      this.setState({
         fabIcon: 'play_arrow',
         fabFunction: this.play
      });
      this.props.dispatch(ActionTypes.PAUSE);
      console.info("Playing!");
   }

   play() {
      this.setState({
         fabIcon: 'pause',
         fabFunction: this.pause
      });
      this.props.play();
      console.info("Paused");
   }

   render() {
      return (
         <FloatingActionButton onClick={this.state.fabFunction.bind(this)} style={style} >
           <FontIcon className="material-icons">{this.state.fabIcon}</FontIcon>
         </FloatingActionButton>
      );

   }
}

FloatingControls.propTypes = {
   play: PropTypes.func.isRequired,
   pause: PropTypes.func.isRequired
}
