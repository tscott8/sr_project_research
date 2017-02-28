import React, { Component } from 'react'
import {Divider, Drawer, AppBar, FontIcon, List, ListItem} from 'material-ui'
import ArcanePlayer from './ArcanePlayer'

const drawerStyle = {
  height: 'calc(100vh - 64px)',
  top:'64px',
};
export default class RadioDrawer extends Component  {
  constructor(props){
    super(props);
  }
  render() {
      return (
        <Drawer
          containerStyle={drawerStyle}
          docked={false}
          open={this.props.open}
          openSecondary={true}
          onRequestChange={this.props.onRequestChange}>
          <ArcanePlayer
             onNext={this.props.onNext}
             onPlay={this.props.onPlay}
             onPrevious={this.props.onPrevious}
             onToggleRepeat={this.props.onToggleRepeat}
             onToggleLoop={this.props.onToggleLoop}
             onSetTime={this.props.onSetTime}
             percent={this.props.percent}
             isRepeating={this.props.isRepeating}
             isLooping={this.props.isLooping}
            queue={this.props.queue}
            currentID={this.props.currentID}/>
        </Drawer>
      );
  }
}
