import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import {FontIcon, FloatingActionButton, IconButton} from 'material-ui'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import PlaybackControl from './PlaybackControl'
export class NowPlayingInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(<div>NowPlayingHere</div>);
  }
}

const controlList = [
  { "icon": "repeat", "tooltip": "repeat", "onClick":"" },
  { "icon": "skip_previous", "tooltip": "previous", "onClick":"" },
  { "icon": "play_arrow", "tooltip": "play/pause", "onClick":"" },
  { "icon": "skip_next", "tooltip": "next", "onClick":"" },
  { "icon": "shuffle", "tooltip": "shuffle", "onClick":"" }
];

const styles = {
  width: '100%',
  bottom: 0,
  position:'fixed'
};
export default class LargePlayer extends Component {

  constructor(props) {
    super(props);
  }
  renderPlaybackButtons() {
    let items = [];
    for (let i = 0; i < controlList.length; i++) {
         let item = controlList[i];
         items.push(<PlaybackControl key={"largeControl" + i} icon={item.icon} tooltip={item.tooltip} onClick={item.onClick}/>);
      }
      return items;
  }
  render() {
    return (
      <Toolbar style={styles}>
        <ToolbarGroup firstChild={true}>
          <NowPlayingInfo/>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          {this.renderPlaybackButtons()}
        </ToolbarGroup>
        <ToolbarGroup>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
