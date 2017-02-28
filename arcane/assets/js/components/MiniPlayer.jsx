import React, { Component } from 'react'
import {FontIcon, FloatingActionButton, Slider, IconButton} from 'material-ui'
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card'
import PlaybackControl from './PlaybackControl'
const url = "http://localhost:8000/";

const cardStyle={
  root: {
  },
  media: {
    controls:{
      marginLeft:'0',
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
    height: 'auto'
  };

export default class MiniPlayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      controlList: [
         { "icon": "repeat", "tooltip": "repeat", "onClick": this.props.onToggleRepeat },
         { "icon": "skip_previous", "tooltip": "previous", "onClick": this.props.onPrevious },
         { "icon": "play_arrow", "tooltip": "play/pause", "onClick": this.props.onPlay },
         { "icon": "skip_next", "tooltip": "next", "onClick": this.props.onNext },
         { "icon": "shuffle", "tooltip": "shuffle", "onClick":"" }

         ]
      }
  }

  handleSlideClick = (event, value) => {
     console.info("Value in handle slide:", value);
     this.props.onSetTime(value);
  }

  renderPlaybackProgress() {
    return(
      <Slider sliderStyle={sliderStyle} defaultValue={0} value={this.props.percent} max={100} onChange={this.handleSlideClick} />
    );
  }
  renderPlaybackButtons() {
    let items = [];
    for (let i = 0; i < this.state.controlList.length; i++) {
         let item = this.state.controlList[i];
         //console.info("Control list item " + i + ": ", item);
         items.push(<PlaybackControl key={"miniControl" + i} icon={item.icon} tooltip={item.tooltip} onClick={item.onClick}/>);
      }
      return items;
  }
  renderPlaybackControls() {
    return(
      <div style={controlPackStyle}>
        {this.renderPlaybackProgress()}
        <div>{this.renderPlaybackButtons()}</div>
      </div>
    );
  }

  render() {
    return (
       <Card style={cardStyle.root}>
        <CardMedia
          style={cardStyle.media}
          overlay={<div style={cardStyle.media.controls}>{this.renderPlaybackControls()}</div>}>
            <img
              style={imgStyle}
              width={'200px'}
              height={'200px'}

              src={url + "static/images/2.jpg"} />
        </CardMedia>
      </Card>
    );
  }
}
