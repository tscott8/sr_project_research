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
    },
    title: {
      textAlign:'center',
      fontSize:'1.5rem'
    },
    artist: {
      textAlign:'center',
      fontSize:'1rem'
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

  getNowPlayingSong() {
    const {currentID, queue} = this.props;
    console.log(currentID, queue)
    let lookup = [];
    for (var i = 0, len = queue.length; i < len; i++) {
        lookup[queue[i].id] = queue[i];
    }
    console.log('in Get', lookup[currentID])
    return lookup[currentID]
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
        <div>
          <Divider/>
          <ListItem
            primaryText={track.name}
            secondaryText={track.artist.name}
            leftAvatar={<Avatar src={track.album.artwork ? track.album.artwork : url+'static/images/default-artwork.png'}/>}
            rightIconButton={this.renderEQIcon(track)}/>
        </div>
    ))
    return (
      <List style={qStyle.root}>
        {q}
      </List>
    );
  }
  renderOverlay() {
    let cur_song = this.getNowPlayingSong();
    return(
      <div style={cardStyle.media.controls}>
        <div style={cardStyle.media.title}>{cur_song.name ? cur_song.name : null}</div>
        <div style={cardStyle.media.artist}>{cur_song.artist.name ? cur_song.artist.name : null}</div>
        {this.renderPlaybackControls()}
      </div>
    );
  }
  renderNowPlaying() {
    // const {currentID, queue} = this.props;
    // console.log(currentID, queue)
    // let lookup = [];
    // for (var i = 0, len = queue.length; i < len; i++) {
    //     lookup[queue[i].id] = queue[i];
    // }
    // console.log(lookup)
    let cur_song = this.getNowPlayingSong();
    return (
      <Card style={cardStyle.root}>
       <CardMedia
         style={cardStyle.media}
         overlay={cur_song ? this.renderOverlay() : null}>
         <img
           style={imgStyle.nowPlaying}
           src={cur_song ? cur_song.album.artwork : url+'static/images/default-artwork.png'} />

       </CardMedia>
     </Card>

    );

  }
  render() {
    return (
      <div>
        {this.renderNowPlaying()}
        {this.renderQueueList()}
      </div>
    );
  }
}
