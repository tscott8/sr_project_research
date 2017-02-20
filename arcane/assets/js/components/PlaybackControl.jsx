import React, { Component } from 'react'
import {FontIcon, FloatingActionButton, Slider, IconButton} from 'material-ui'
const styles = {
   smallIcon: {
     width:20,
     height:20,
     fontSize:20,
     color: 'rgb(213, 0, 0)'
   },
   mediumIcon: {
     width:40,
     height:40,
     fontSize:40,
     color: 'rgb(213, 0, 0)'
   },
   largeIcon: {
     width:60,
     height:60,
     fontSize:60
   },
   small: {
     width: 25,
     height: 25,
     padding:4,
     verticalAlign:'super'
   },
   medium: {
     width:45,
     height:45,
     padding:4,
     verticalAlign:'bottom'
   },
   large: {
     width: 65,
     height: 65,
     padding:4
   },
   hover: {
     color: 'rgb(213, 0, 0)'
   }
};
export default class PlaybackControl extends Component {
  constructor(props){
    super(props);
    this.state = {playing:true};

  }
  playPauseClick() { this.setState({playing: !this.state.playing}); }
  render(){
    let type = this.props.icon;
    if (type === 'play_arrow') {
      return(
        <IconButton
          iconClassName="material-icons"
          style={styles.medium}
          iconStyle={styles.mediumIcon}
          onClick={this.playPauseClick.bind(this)}
          tooltip={this.props.tooltip}
          tooltipPosition="top-center"
          hoveredStyle={styles.hover}>
          {this.state.playing ? this.props.icon : "pause"}
        </IconButton>
      );
    }
    else {
      return(
        <IconButton
          iconClassName="material-icons"
          style={styles.small}
          iconStyle={styles.smallIcon}
          onClick={this.props.onCLick}
          tooltip={this.props.tooltip}
          tooltipPosition="top-center"
          hoveredStyle={styles.hover}>
          {this.props.icon}
        </IconButton>
      );
    }
  }
}
