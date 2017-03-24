import React, {Component, PropTypes} from 'react';
import { FontIcon, Avatar, IconButton, IconMenu, Menu, MenuItem, Divider, List, ListItem} from 'material-ui'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Waypoint from 'react-waypoint'
import * as TrackActions from '../actions/TrackActions'
import Tile from './Tile'
import theme from '../constants/material-ui-theme'

const url = "http://localhost:8000/";

export default class TracksCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTracks: [],
    }
  }

  handleChange = (event, value) => {
    const {select} = this.props;
    select ? select(value) : console.log('No select function prop');
  }

  loadMore = () => {
     const {tracks, dispatch} = this.props;
     if (tracks.next) {
        dispatch(TrackActions.getNextTracks(tracks.next));
     }
  }

  renderTrackItemMenu() {
    return(
      <IconMenu
        style={{top:12, right:36}}
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
    const {noArt} = this.props;
    if (!noArt && track) {
      return (
        <Avatar
          style={{borderRadius:1}}
          src={track.album.artwork ? track.album.artwork : url+'static/images/default-artwork.png'}/>
     );
    }
    if (noArt && track) {
      return (
        <Avatar style={{backgroundColor:'transparent', color:theme.palette.textColor}}>{track.order}</Avatar>
      );
    }
  }

  renderTracksListItems(tracks) {
    // ListItem.defaultProps.disableTouchRipple=true;
    if (tracks) {
      let arr = tracks.map((track) => (
          <MenuItem
            id={'tracks_collection_menu_item'+track.id}
            key={'track_list_item_'+ track.id}
            animation={null}
            innerDivStyle={{padding:0, width:'100%'}}
            value={track}>
            <Divider/>
            <ListItem
              id={'tracks_collection_menu_item_list_item'+track.id}
              // style={{paddingRight:0, width:'100%'}}
              innerDivStyle={{whiteSpace:'pre-line'}}
              disabled={true}
              primaryText={track.name}
              secondaryText={track.artist.name + ' - ' + track.duration}
              rightIconButton={this.renderTrackItemMenu()}
              leftAvatar={this.renderArt(track)}
            />
          </MenuItem>
      ))
      return arr;
    }
  }
  render() {
    const {tracks, selectedTracks} = this.props;
    return(
      <div style={{width:'100%',height:'100%'}}>
        <Menu
          id={'tracks_collection_menu'}
          autoWidth={true}
          // desktop={false}
          // width={'100%'}
          // style={{minWidth:'100% '}}
          listStyle={{paddingTop:0, paddingBottom:0, paddingRight:0, margin:0, maxWidth:'100%'}}
          disableAutoFocus={true}
          // menuItemStyle={{padding:0}}
          selectedMenuItemStyle={{backgroundColor:theme.palette.accent2Color}}
          multiple={true}
          onChange={this.handleChange}
          value={selectedTracks ? selectedTracks : []}>
          {this.renderTracksListItems(tracks.results)}
        </Menu>
        <Waypoint
          onEnter={this.loadMore}
        />
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
