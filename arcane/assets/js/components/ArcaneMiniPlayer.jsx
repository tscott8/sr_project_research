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
     width: '30',
     height:' 30',
     fontSize: '30px'
   },
   largeIcon: {
     width: '60',
     height:' 60',
     fontSize: '60px'
   },
   small: {
     width: '25',
     height: '25',
     padding:' 4'
   },
   medium: {
     width: '35',
     height: '35',
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
  }

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
    if (type === 'play_circle_outline') {
      console.log("HELLO!")
      return(
        <IconButton
          iconClassName="material-icons"
          style={sizes.medium}
          iconStyle={sizes.mediumIcon}
          onClick={this.props.onCLick}>
          {this.props.icon}
        </IconButton>
      );
    }
    else {
      return(
        <IconButton
          iconClassName="material-icons"
          style={sizes.small}
          iconStyle={sizes.smallIcon}
          onClick={this.props.onCLick}>
          {this.props.icon}
        </IconButton>
      );
    }
  }
}

const controlList = [
  { "icon": "repeat", "onClick":"" },
  { "icon": "skip_previous", "onClick":"" },
  { "icon": "play_circle_outline", "onClick":"" },
  { "icon": "skip_next", "onClick":"" },
  { "icon": "shuffle", "onClick":"" }

];

const cardStyle={
  root: {
    marginTop:'2%',
    marginBottom:'2%'
  },
  media: {
    controls:{
      marginBottom:'1%',    }
  }
};
const controlPackStyle = {
  textAlign:'center',
  margin:'0',
  padding:'0'
};
const sliderStyle = {
  margin:'0',
  padding:'0'
}
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
         items.push(<PlaybackControl key={"control" + i} icon={item.icon} onClick={item.onClick}/>);
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
      <div style={cardStyle.root}>
      <Card style={cardStyle.card}>
        <CardMedia
          style={cardStyle.media}
          overlay={<div style={cardStyle.media.controls}>{this.renderPlaybackControls()}</div>}>
            <img src={url + "static/images/1.jpg"} />
        </CardMedia>
      </Card>
    </div>
    );
  }
}
