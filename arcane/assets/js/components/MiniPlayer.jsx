import React, { Component } from 'react'
import {FontIcon, FloatingActionButton, Slider, IconButton, List, ListItem, Divider, Avatar} from 'material-ui'
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card'
import PlaybackControl from './PlaybackControl'
const url = "http://localhost:8000/";

const style={
  root: {
  },
  player: {
    marginLeft:0,
    paddingBottom:8,
    controlDivider: {
      marginLeft:4,
      marginRight:4,
    },
    controlPack: {
      textAlign:'center',
      margin:'0',
      padding:'0',
      width:'100%',
    },
    slider: {
      margin:'0',
      padding:'0',
    }
  },
  labelDivider: {
    verticalAlign:'top',
    paddingTop:4,
    height:201
  },
  title: {
    fontSize:'1.8rem',
    marginLeft:8,
    marginRight:8,
    textAlign:'center',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'clip',
    },
  artist: {
    fontSize:'1.4rem',
    marginLeft:8,
    marginRight:8,
    textAlign:'center',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'clip',
  },
  img: {
    nowPlaying: {
      flex: 1,
      maxHeight:'calc((100vh-64px)/6)'
    },
    avatar: {
      borderRadius:'0%',
      // height:45,
      // width:45
    },
  },
  queue: {
    height:'55vh',
    overflowY:'auto'
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
    let lookup = [];
    for (var i = 0, len = queue.length; i < len; i++) {
        lookup[queue[i].id] = queue[i];
    }
    return lookup[currentID]
  }

  renderPlaybackButtons() {
    let items = [];
    for (let i = 0; i < this.state.controlList.length; i++) {
         let item = this.state.controlList[i];
         //console.info("Control list item " + i + ": ", item);
         items.push(<span style={style.player.controlDivider}><PlaybackControl
                      key={"miniControl" + i}
                      icon={item.icon}
                      tooltip={item.tooltip}
                      onClick={item.onClick}/></span>);
      }
      return items;
  }
  renderPlaybackControls() {
    return(
      <div style={style.player.controlPack}>
        <Slider
          sliderStyle={style.player.slider}
          defaultValue={0}
          value={this.props.percent}
          max={100}
          onChange={this.handleSlideClick.bind(this)}/>
        <div>{this.renderPlaybackButtons()}</div>
      </div>
    );
  }
  renderEQIcon(track) {
    const {currentID} = this.props;
    return(track.id === currentID ? <IconButton iconStyle={{color:'red'}} iconClassName="material-icons">equalizer</IconButton>
                                  : <IconButton iconClassName="material-icons">play_arrow</IconButton>);
  }
  renderQueueList() {
    const {queue} = this.props;
      let q = queue.map((track) => (
        <div>
          <Divider/>
          <ListItem
            primaryText={track.name}
            secondaryText={track.artist.name}
            leftAvatar={<Avatar
                          style={style.img.avatar}
                          src={track.album.artwork ? track.album.artwork : url+'static/images/default-artwork.png'}/>}
            rightIconButton={this.renderEQIcon(track)}/>
        </div>
    ))
    return (<List style={style.queue}>{q}</List>);
  }

  renderOverlay() {
    let cur_song = this.getNowPlayingSong();
    return(
      <div style={style.player}>
        <div style={style.labelDivider}>
          <div style={style.title}>{cur_song.name ? cur_song.name : null}</div>
          <div style={style.artist}>{cur_song.artist.name ? cur_song.artist.name : null}</div>
        </div>
        {this.renderPlaybackControls()}
      </div>
    );
  }

  renderNowPlaying() {
    let cur_song = this.getNowPlayingSong();
    return (
      <Card style={style.root}>
       <CardMedia
         style={style.media}
         overlay={cur_song ? this.renderOverlay() : null}>
         <img
           style={style.img.nowPlaying}
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
