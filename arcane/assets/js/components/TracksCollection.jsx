import React, {Component, PropTypes} from 'react';
import { FontIcon, Avatar, IconButton, IconMenu, Menu, MenuItem, Divider, List, ListItem} from 'material-ui'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Tile from './Tile'
const url = "http://localhost:8000/";

const collectionStyles = {
  root: {
    width:'100%',
    height:'100%'

  },
  gridList: {
    margin:0,
    marginTop:2,
    width:'100%',
    height:'100%',
  },
  table: {
    // maxHeight:'calc(100vh - 114px)',

  },
  artistTile: {
    root:{
    },
    img:{
      maxHeight:'calc(100vw/8)',
      maxWidth: 'calc(100vw/8)',
      minHeight:100,
      minWidth: 100
    },
  },
  href: {
    color:'white'
  }
};

export default class TracksCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTracks: [],
    }
  }

  handleChange = (event, value) => {
    this.props.select ? this.props.select(value) : console.log('No select function prop');
  }

  sortTracks (prop, arr) {
    prop = prop.split('.');
    var len = prop.length;

    arr.sort(function (a, b) {
        var i = 0;
        while( i < len ) { a = a[prop[i]]; b = b[prop[i]]; i++; }
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    });
    return arr;
  }
  renderTrackItemMenu() {
    return(
      <IconMenu
        iconButtonElement={<IconButton iconClassName="material-icons">more_vert</IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
        <MenuItem primaryText="Start radio" />
        <MenuItem primaryText="Play next" />
        <Divider/>
        <MenuItem primaryText="Add to queue" />
        <MenuItem primaryText="Add to playlist" />
        <Divider/>
        <MenuItem primaryText="Artist info" />
        <MenuItem primaryText="Album info" />
      </IconMenu>
    );
  }
  renderArt(track) {
    if (!this.props.noArt && track) {
      return (
        <Avatar
          style={{borderRadius:'10%'}}
          src={track.album.artwork ? track.album.artwork : url+'static/images/default-artwork.png'}/>
     );
    }
  }

  renderTracksListItems(tracks) {
    ListItem.defaultProps.disableTouchRipple=true;
    if (tracks) {
      let arr = tracks.map((track) => (
          <MenuItem
            key={'track_list_item_'+ track.id}
            animation={null}
            // style={{maxWidth:'100%'}}
            innerDivStyle={{padding:0, position:'relative'}}
            value={track}>
            <Divider/>
            <ListItem
              style={{maxWidth:'99%'}}
              innerDivStyle={{whiteSpace:'pre-line', }}
              disabled={true}
              primaryText={track.name}
              secondaryText={track.artist.name + ' - ' + track.duration}
              rightIconButton={this.renderTrackItemMenu()}
              leftAvatar={this.renderArt(track)
          }/>
          </MenuItem>
      ))
      return arr;
    }
  }
  render() {
    const {tracks} = this.props;
    return(
      <Menu
        // autoWidth={true}
        // desktop={false}
        width={'100%'}
        // style={{maxWidth:'100vw'}}
        listStyle={{paddingTop:0, maxWidth:'100vw'}}
        disableAutoFocus={true}
        // menuItemStyle={{padding:0}}
        selectedMenuItemStyle={{backgroundColor:'red'}}
        multiple={true}
        onChange={this.handleChange}
        value={this.props.selectedTracks ? this.props.selectedTracks : []}>
        {/* {this.renderTracksListItems(this.sortTracks( 'artist.name', tracks.results))} */}
        {this.renderTracksListItems(tracks.results)}

      </Menu>
    );
  }

}
