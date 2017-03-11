import React, { Component } from 'react'
import {FontIcon, FloatingActionButton, Slider, IconButton, List, ListItem, Divider, Avatar} from 'material-ui'
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card'
import { DefaultControl, IconChangeControl, ColoredControl } from './PlaybackControls'
const url = "http://localhost:8000/";

const style={
  root: {
  },
  player: {
    marginLeft:0,
    paddingBottom:8,
    textOverflow: 'clip',
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
    padding:0,
    height:201
  },
  title: {
    // fontSize:'1.8rem',
    marginLeft:8,
    marginRight:8,
    textAlign:'center',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'clip',
    padding:0,
    lineHeight:1.2
    },
  artist: {
    // fontSize:'1.4rem',
    marginLeft:8,
    marginRight:8,
    textAlign:'center',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'clip',
    padding:0,
    lineHeight:1.1
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
    paddingTop:0,
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

  componentWillReceiveProps() {
     const { onToggleRepeat, onPrevious, onPlay, onNext } = this.props;
     var newControlList = this.state.controlList;
     //console.info(onPlay);
     newControlList[0].onClick = onToggleRepeat;
     newControlList[1].onClick = onPrevious;
     newControlList[2].onClick = onPlay;
     newControlList[3].onClick = onNext;
     this.setState({
        controlList: newControlList
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
   //  let items = [];
   //  //console.info(this.props.isPlaying)
   //  for (let i = 0; i < this.state.controlList.length; i++) {
   //       let item = this.state.controlList[i];
   //       //console.info("Control list item " + i + ": ", item.onClick);
   //       items.push(<span style={style.player.controlDivider}><PlaybackControl
   //                    key={"miniControl" + i}
   //                    icon={item.icon}
   //                    tooltip={item.tooltip}
   //                    onClick={item.onClick}
   //                    isPlaying={this.props.isPlaying}/></span>);
   //    }
   //    return items;
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
     //console.info(this.props.percent);
    return(
      <div style={style.player.controlPack}>
        <Slider
          sliderStyle={style.player.slider}
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
        {/* <div style={style.labelDivider}> */}
          <CardTitle
            style={style.labelDivider}
            titleStyle={style.title}
            subtitleStyle={style.artist}
            title={cur_song.name ? cur_song.name : null}
            subtitle={cur_song.artist.name ? cur_song.artist.name : null}/>
          {/* <div style={style.title}>{cur_song.name ? cur_song.name : null}</div>
          <div style={style.artist}>{cur_song.artist.name ? cur_song.artist.name : null}</div> */}
        {/* </div> */}
        {this.renderPlaybackControls()}
      </div>
    );
  }

  renderNowPlaying() {
    let cur_song = this.getNowPlayingSong();
    return (
      <Card>
       <CardMedia
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
      <div style={{maxHeight:'calc(100vh-64px)'}}>
        {this.renderNowPlaying()}
        {this.renderQueueList()}
      </div>
    );
  }
}
