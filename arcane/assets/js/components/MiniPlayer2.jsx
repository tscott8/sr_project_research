import React, { Component } from 'react'
import {FontIcon, FloatingActionButton, Slider, IconButton} from 'material-ui'
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card'
import PlaybackControl from './PlaybackControl'


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
     console.info("Percent value: ", value);
     this.props.onSetTime(value);
  }

  renderPlaybackProgress() {
    return(
      <Slider sliderStyle={sliderStyle} defaultValue={0} value={this.props.percent} onChange={this.handleSlideClick} />
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
      <div className={"player"}>
     <div className={"cover"}></div>
     <nav>
       <div className={"left"}>
         <i className={"material-icons"}>menu</i>
         <h6>Playlist</h6>
       </div>
       <div className={"right"}>
         <i className={"material-icons search"}>search</i>
         <i className={"material-icons"}>queue_music</i>
       </div>
     </nav>
     <div className={"player-ui"}>
       <div className={"title"}>
         <h3>Hello</h3>
       </div>
       <div className={"small"}>
         <i className={"material-icons"}>replay</i>
         <p>Adele</p>
         <i className={"material-icons"}>volume_up</i>
       </div>
       <div className={"progress"}>
         <div className={"played"}>
           <div className={"circle"}></div>
         </div>
       </div>
       <div className={"controls"}>
         <i className={"material-icons"}>skip_previous</i>
         <i className={"material-icons"}>play_arrow</i>
         <i className={"material-icons"}>skip_next</i>
       </div>
     </div>
     <div className={"btn"}>
       <i className={"material-icons"}>shuffle</i>
     </div>
     <div className={"music"}>
       <div className={"song-1"}>
         <div className={"info"}>
           <div className={"img first"}></div>
           <div className={"titles"}>
             <h5>Hello</h5>
             <p>Adele</p>
           </div>
         </div>
         <div className={"state playing"}>
           <i className={"material-icons"}>equalizer</i>
         </div>
       </div>
       <div className={"song-2"}>
         <div className={"info"}>
           <div className={"img second"}></div>
           <div className={"titles"}>
             <h5>Californication</h5>
             <p>Red Hot Chili Pepers</p>
           </div>
         </div>
         <div className={"state"}>
           <i className={"material-icons"}>play_arrow</i>
         </div>
       </div>
       <div className={"song-3"}>
         <div className={"info"}>
           <div className={"img third"}></div>
           <div className={"titles"}>
             <h5>6 INCH</h5>
             <p>beyoncé</p>
           </div>
         </div>
         <div className={"state"}>
           <i className={"material-icons"}>play_arrow</i>
         </div>
       </div>
       <div className={"song-4"}>
         <div className={"info"}>
           <div className={"img fourth"}></div>
           <div className={"titles"}>
             <h5>Purple rain</h5>
             <p>Prince & The Revolution</p>
           </div>
         </div>
         <div className={"state"}>
           <i className={"material-icons"}>play_arrow</i>
         </div>
       </div>
     </div>
    </div>
    );
  }
}
