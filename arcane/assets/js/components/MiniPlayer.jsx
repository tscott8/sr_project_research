import React, { Component } from 'react'
import {FontIcon, FloatingActionButton, Slider, IconButton, List, ListItem, Divider, Avatar} from 'material-ui'
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card'
import { DefaultControl, IconChangeControl, ColoredControl } from './PlaybackControls'
import { fade } from 'material-ui/utils/colorManipulator'
import {redA700, cyan700 } from 'material-ui/styles/colors'
import theme from '../constants/material-ui-theme'

const url = "http://localhost:8000/";


const style ={
  container: {
    height:280,
    width:280,
    position:'relative',
    top:0,
    right:0,
    zIndex:1
  },
  titleContainer: {
    padding:0,
    top:0,
    position:'absolute',
    width:'100%',

  },
  title: {
    textAlign:'center',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'clip',
  },
  controlContainer: {
    width:'100%',
    position:'absolute',
    bottom:0,
    textAlign:'center',
  },
  slider: {
      margin:'0',
      padding:'0',
  },
  buttons: {
    textAlign:'center'
  },
  playerArt: {
    flex: 1,
    height:280
  },
  queueArt: {
    borderRadius:'0%',
  },
  queue: {
    paddingTop:0,
    position:'absolute',
    top:280,
    maxWidth:280,

    bottom:0,
    overflowY:'auto'
  }
}

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

  componentWillReceiveProps() {
     const { onToggleRepeat, onPrevious, onPlay, onNext } = this.props;
     var newControlList = this.state.controlList;
     newControlList[0].onClick = onToggleRepeat;
     newControlList[1].onClick = onPrevious;
     newControlList[2].onClick = onPlay;
     newControlList[3].onClick = onNext;
     this.setState({
        controlList: newControlList,
     });
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
      return (
         <div>
            <ColoredControl
               flag={this.props.isLooping}
               onClick={this.props.onToggleLoop}
               icon="repeat" />
            <DefaultControl
               onClick={this.props.onPrevious}
               icon="skip_previous" />
            <IconChangeControl
               flag={this.props.isPlaying}
               onClick={this.props.onPlay}
               icon1="play_arrow"
               icon2="pause" />
            <DefaultControl
               onClick={this.props.onNext}
               icon="skip_next" />
            <ColoredControl
               flag={this.props.isShuffling}
               onClick={this.props.onToggleShuffle}
               icon="shuffle" />
         </div>
      );
  }
  renderPlaybackControls() {
    return(
      <div style={style.controlContainer}>
        <Slider
          sliderStyle={style.slider}
          defaultValue={0}
          value={this.props.percent}
          max={1}
          onChange={this.handleSlideClick.bind(this)}/>
        {this.renderPlaybackButtons()}
      </div>
    );
  }
  renderEQIcon(track) {
    const {currentID} = this.props;
    return(track.id === currentID ? <IconButton iconStyle={{color: theme.palette.alternateTextColor}} iconClassName="material-icons">equalizer</IconButton>
                                  : <IconButton iconClassName="material-icons">play_arrow</IconButton>);
  }
  renderQueueList() {
    const {queue} = this.props;
      let q = queue.map((track) => (
        <div
          key={'miniplayer_queue_track_'+track.id}
        >
          <Divider/>
          <ListItem
            hoverColor={fade(theme.palette.accent1Color, 0.3)}
            primaryText={track.name}
            secondaryText={track.artist.name}
            leftAvatar={<Avatar
              style={style.queueArt}
              src={track.album.artwork ? track.album.artwork : url+'static/images/default-artwork.png'}/>}
            rightIconButton={this.renderEQIcon(track)}/>
        </div>
    ))
    return (<List style={style.queue}>{q}</List>);
  }


  renderOverlay () {
    let cur_song = this.getNowPlayingSong();
      return (
        <div id="player_overlay_container" style={style.container}>
          <CardTitle
            id="player_overlay_title"
            style={style.titleContainer}
            titleStyle={style.title}
            subtitleStyle={style.title}
            title={cur_song.name ? cur_song.name : null}
            subtitle={cur_song.artist.name ? cur_song.artist.name : null}/>
              {this.renderPlaybackControls()}
        </div>
      );
}
  renderNowPlaying() {
    let cur_song = this.getNowPlayingSong();
    return (
      <Card >
       <CardMedia
         overlay={cur_song ? this.renderOverlay() : null}>
         <img
           style={style.playerArt}
           src={cur_song ? cur_song.album.artwork : url+'static/images/default-artwork.png'} />
       </CardMedia>
     </Card>

    );

  }
  render() {
    return (
      <div >
        {this.renderNowPlaying()}
        {this.renderQueueList()}
      </div>
    );
  }
}
