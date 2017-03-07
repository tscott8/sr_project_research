import React, { Component } from 'react'
import {Divider, Drawer, AppBar, FontIcon, List, ListItem} from 'material-ui'
import MiniPlayer from './MiniPlayer'

const drawerStyle = {
  height: 'calc(100vh - 64px)',
  top:'64px',
  overflowY:'hidden'
};
export default class NowPlayingDrawer extends Component  {
  constructor(props){
    super(props);
  }
  render() {
     //console.info(this.props.isPlaying);
      return (
        <Drawer
          containerStyle={drawerStyle}
          docked={false}
          open={this.props.open}
          openSecondary={true}
          onRequestChange={this.props.onRequestChange}>
          <MiniPlayer
             onNext={this.props.onNext}
             onPlay={this.props.onPlay}
             onPrevious={this.props.onPrevious}
             onToggleRepeat={this.props.onToggleRepeat}
             onToggleLoop={this.props.onToggleLoop}
             onSetTime={this.props.onSetTime}
             percent={this.props.percent}
             isRepeating={this.props.isRepeating}
             isLooping={this.props.isLooping}
             isPlaying={this.props.isPlaying}
            queue={this.props.queue}
            currentID={this.props.currentID}/>
        </Drawer>
      );
  }
}
