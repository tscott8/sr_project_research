import React, { Component } from 'react'
import {FontIcon, FloatingActionButton, Slider, IconButton, List, ListItem, Divider, Avatar} from 'material-ui'
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
const qStyle= {
  root: {
    height:'55vh',
    overflowY:'auto'
  }
}
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
  nowPlaying: {
    flex: 1,
    maxHeight:'calc((100vh-64px)/6)'
  },
  avatar: {
    maxWidth:50,
  }
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
  renderEQIcon(track) {
    const {currentID} = this.props;
    if(track.id === currentID) {
      return(
        <IconButton
          iconClassName="material-icons">equalizer</IconButton>
      );
    }
    else {
      return (
        <IconButton
          iconClassName="material-icons">play_arrow</IconButton>
      );
    }
  }
  renderQueueList() {
    const {queue} = this.props;
      let q = queue.map((track) => (
          <ListItem
            primaryText={track.name}
            secondaryText={track.artist.name}
            leftAvatar={<Avatar src={track.album.artwork ? track.album.artwork : url+'static/images/default-artwork.png'}/>}
            rightIconButton={this.renderEQIcon(track)}/>
    ))
    return q;
  }
  renderQueue() {
    return (
      <List style={qStyle.root}>
        {this.renderQueueList()}
      </List>
    );
  }
  renderNowPlayingArt() {
    const {currentID, queue} = this.props;
    console.log(currentID, queue)
    let lookup = [];
    for (var i = 0, len = queue.length; i < len; i++) {
        lookup[queue[i].id] = queue[i];
    }
    console.log(lookup)
    let art_src = lookup[currentID]
    console.log(art_src)
    return (
      <img
        style={imgStyle.nowPlaying}
        src={art_src ? art_src.album.artwork : url+'static/images/default-artwork.png'} />
    );

  }
  render() {
    return (
      <div>
       <Card style={cardStyle.root}>
        <CardMedia
          style={cardStyle.media}
          overlay={<div style={cardStyle.media.controls}>{this.renderPlaybackControls()}</div>}>
          {this.renderNowPlayingArt()}

        </CardMedia>
      </Card>
      {this.renderQueue()}
    </div>
    );
  }
}
