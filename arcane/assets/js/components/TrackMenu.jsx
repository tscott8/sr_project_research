import React, {Component} from 'react';
import {  IconButton, IconMenu, MenuItem, Divider} from 'material-ui'

export default class TrackMenu extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        actions: ['startRadio', 'playNext', 'addToQueue', 'addToPlaylist', 'goToArtist', 'goToAlbum'],
    }
  }

  handleSelect = (e, value) => {
    // console.log('IN handleSelect', item, e);
    const {id, name} = this.props;
    const {actions} = this.state;
    console.log(e, value)
    // console.log('Selected ',item.value,' on track ('+id+' : '+name+')');
    alert('Dispatch '+actions[value]+' for track: ('+id+' : '+name+')');
  }

  render() {
    return(
      <IconMenu
        style={{ position:'absolute', top:12, right:36}}
        iconButtonElement={<IconButton iconClassName="material-icons">more_vert</IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        onChange={this.handleSelect}
      >
        <MenuItem value={0} primaryText="Start radio" />
        <MenuItem value={1} primaryText="Play next" />
        <Divider/>
        <MenuItem value={2} primaryText="Add to queue" />
        <MenuItem value={3} primaryText="Add to playlist" />
        <Divider/>
        <MenuItem value={4} primaryText="Artist info" />
        <MenuItem value={5} primaryText="Album info" />
      </IconMenu>
    );
  }
}
