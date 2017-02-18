import React, { Component } from 'react'
import {FontIcon, FloatingActionButton, Slider, IconButton} from 'material-ui'
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card'

const url = "http://localhost:8000/";

const sizes = {
   smallIcon: {
     width: '20',
     height:' 20',
     fontSize: '20px'
   },
   mediumIcon: {
     width: '40',
     height:' 40',
     fontSize: '40px'
   },
   largeIcon: {
     width: '60',
     height:' 60',
     fontSize: '60px'
   },
   small: {
     width: '25',
     height: '25',
     padding:' 4',
     verticalAlign:'super'
   },
   medium: {
     width: '45',
     height: '45',
     padding:' 4',
     verticalAlign:'bottom'
   },
   large: {
     width: '65',
     height: '65',
     padding:'4'
   }
};
export class PlaybackControl extends Component {
  constructor(props){
    super(props);
    this.state = {playing:true};

  }
  playPauseClick() { this.setState({playing: !this.state.playing}); }
  renderFloater() {
    return (
      <FloatingActionButton style={sizes.root} mini={this.props.mini} onClick={this.props.onClick}>
        <FontIcon className="material-icons">{this.props.icon}</FontIcon>
      </FloatingActionButton>
    );
  }
  render(){
    let type = this.props.icon;
    console.log(type.toString());
    if (type === 'play_arrow') {
      return(
        <IconButton
          iconClassName="material-icons"
          style={sizes.medium}
          iconStyle={sizes.mediumIcon}
          onClick={this.playPauseClick.bind(this)}
          tooltip={this.props.tooltip}
          tooltipPosition="bottom-center">
          {this.state.playing ? this.props.icon : "pause"}
        </IconButton>
      );
    }
    else {
      return(
        <IconButton
          iconClassName="material-icons"
          style={sizes.small}
          iconStyle={sizes.smallIcon}
          onClick={this.props.onCLick}
          tooltip={this.props.tooltip}
          tooltipPosition="bottom-center">
          {this.props.icon}
        </IconButton>
      );
    }
  }
}

const controlList = [
  { "icon": "repeat", "tooltip": "repeat", "onClick":"" },
  { "icon": "skip_previous", "tooltip": "previous", "onClick":"" },
  { "icon": "play_arrow", "tooltip": "play/pause", "onClick":"" },
  { "icon": "skip_next", "tooltip": "next", "onClick":"" },
  { "icon": "shuffle", "tooltip": "shuffle", "onClick":"" }

];

const cardStyle={
  root: {

  },
  media: {
    controls:{
      marginLeft:'0',
      width: '100%'
    }
  }
};
const controlPackStyle = {
  textAlign:'center',
  margin:'0',
  padding:'0',
  width:'100%'
};
const sliderStyle = {
  margin:'0',
  padding:'0',
};
const imgStyle = {
    flex: 1,
    width: '100%',
    height: 'auto',};

export default class MiniPlayer extends Component {
  constructor(props){
    super(props);
  }

  renderPlaybackProgress() {
    return(
      <Slider sliderStyle={sliderStyle}/>
    );
  }
  renderPlaybackButtons() {
    let items = [];
    for (let i = 0; i < controlList.length; i++) {
         let item = controlList[i];
         items.push(<PlaybackControl key={"control" + i} icon={item.icon} tooltip={item.tooltip} onClick={item.onClick}/>);
      }
      return items;
  }
  renderPlaybackControls() {
    return(
      <div style={controlPackStyle}>
        {this.renderPlaybackProgress()}
        <div style={controlPackStyle}>{this.renderPlaybackButtons()}</div>
      </div>
    );
  }

  render() {
    return (
       <Card style={cardStyle.root}>
        <CardMedia
          style={cardStyle.media}
          overlay={<div style={cardStyle.media.controls}>{this.renderPlaybackControls()}</div>}>
            <img style={imgStyle} src={url + "static/images/1.jpg"} />
        </CardMedia>
      </Card>
    );
  }
}
