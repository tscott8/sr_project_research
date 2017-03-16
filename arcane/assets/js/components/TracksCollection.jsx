import React, {Component, PropTypes} from 'react';
import { FontIcon, Avatar, IconButton, IconMenu, Menu, MenuItem, Divider, List, ListItem} from 'material-ui'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Waypoint from 'react-waypoint'
import * as TrackActions from '../actions/TrackActions'
import Tile from './Tile'
import theme from '../constants/material-ui-theme'
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

  loadMore = () => {
     console.info(this.props);
     if (this.props.tracks.next) {
        this.props.dispatch(TrackActions.getNextTracks(this.props.tracks.next));
     }
  }

  renderTrackItemMenu() {
    return(
      <IconMenu
        style={{top:12, right:20}}
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
          style={{borderRadius:'0%'}}
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
            style={{padding:0}}
            innerDivStyle={{padding:0, maxWidth:'100vw'}}
            value={track}>
            <Divider/>
            <ListItem
              style={{paddingRight:0, width:'100%'}}
              innerDivStyle={{whiteSpace:'pre-line', paddingRight:0, textShadow:'1px 1px black'}}
              disabled={true}
              primaryText={track.name}
              secondaryText={track.artist.name + ' - ' + track.duration}
              // primaryText={<span style={{width:'75%', display:'block',}}>{track.name}</span>}
              // secondaryText={<span style={{width:'75%', display:'block',paddingBottom:0}}>{track.artist.name + ' - ' + track.duration}</span>}
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
      <div style={collectionStyles.root}>
        <Menu
          autoWidth={true}
          desktop={false}
          // width={'inherit'}
          // style={{width:'100%'}}
          listStyle={{paddingTop:0, paddingBottom:0, maxWidth:'100%'}}
          disableAutoFocus={true}
          // menuItemStyle={{padding:0}}
          selectedMenuItemStyle={{backgroundColor:theme.palette.accent2Color}}
          multiple={true}
          onChange={this.handleChange}
          value={this.props.selectedTracks ? this.props.selectedTracks : []}>
          {/* {this.renderTracksListItems(this.sortTracks( 'artist.name', tracks.results))} */}
          {this.renderTracksListItems(tracks.results)}
        </Menu>
        <Waypoint
           onEnter={this.loadMore}
           />
        {/*<IconButton iconClassName="material-icons" onClick={this.loadMore}
           //disabled={this.props.tracks.next}
           >expand_more</IconButton>*/}
      </div>
    );
  }

}
// renderTracksTable() {
//   const {tracks} = this.props;
//   return(
//       <Table height={'calc(100vh - 172px)'} multiSelectable={true}  onRowSelection={this.selectTracks.bind(this)}>
//         <TableHeader enableSelectAll={true}>
//           <TableRow>
//             <TableHeaderColumn>Name</TableHeaderColumn>
//             <TableHeaderColumn>Duration</TableHeaderColumn>
//             <TableHeaderColumn>Artist</TableHeaderColumn>
//             <TableHeaderColumn>Album</TableHeaderColumn>
//             <TableHeaderColumn>Genre</TableHeaderColumn>
//             <TableHeaderColumn>Play Count</TableHeaderColumn>
//           </TableRow>
//         </TableHeader>
//         <TableBody
//           displayRowCheckbox={false}
//           deselectOnClickaway={false}
//           preScanRows={false}
//           stripedRows={true}
//           style={collectionStyles.tbody}
//           showRowHover={false}>
//             {this.renderTracksRows(tracks.results)}
//         </TableBody>
//       </Table>
//   );
// }
// render() {
//   return (this.renderTracksList());
// }
