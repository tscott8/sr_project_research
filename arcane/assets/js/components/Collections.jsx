import React, {Component} from 'react';
import {GridTile, GridList,
  FontIcon, Avatar, IconButton,
  IconMenu, Menu, MenuItem,
  List, ListItem, Divider} from 'material-ui'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import SquareButton from './SquareButton'


const url = "http://localhost:8000/";

const collectionStyles = {
  root: {
    width:'100%',
    height:'100%'

  },
  gridList: {
    marginTop:3,
    width:'100%',
    height:'100%'
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
export class GenresCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderGenreTiles(genres) {
    if (genres) {
      let arr = genres.map((tile) => (
        <GridTile
          key={'genreTile_'+ tile.id}>
          <SquareButton
            key={"genreMenuTile_" + tile.id}
            name={tile.name}
            icon={tile.icon ? tile.icon : 'build'}
            url={tile.url ? tile.url : ''}
            onClick={this.props.onClick}/>
        </GridTile>
      ))
      return arr;
    }
  }
  render() {
    const {genres} = this.props;
    return(
        <GridList
          cols={8}
          cellHeight={'auto'}
          style={collectionStyles.gridList}>
          {this.renderGenreTiles(genres.results)}
          </GridList>
    );
  }
}

export class TracksCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTracks: [],
    }
  }
  // selectTracks(rows) {
  //   console.log(r)
  //   console.log('rows', rows)
  //   const {tracks} = this.props;
  //   if (rows === "all") {
  //       this.props.select(tracks.results)
  //   }
  //   let selectedTracks = [];
  //   for (var i = 0; i < rows.length; i++) {
  //     selectedTracks.push(tracks.results[rows[i]]);
  //   }
  //   this.props.select(selectedTracks)
  // }
  handleChange = (event, value) => {
    // this.setState({selectedTracks:value})
    this.props.select(value);
  }

  // renderTracksRows(tracks) {
  //   if (tracks) {
  //     let arr = tracks.map((track) => (
  //       <TableRow
  //         key={'trackRow_'+ track.id}>
  //         <TableRowColumn><a style={collectionStyles.href} href={track.url}>{ track.name }</a></TableRowColumn>
  //         <TableRowColumn>{track.duration }</TableRowColumn>
  //         <TableRowColumn><a style={collectionStyles.href} href={url+'api/artists/'+track.artist.id}>{ track.artist.name }</a></TableRowColumn>
  //         <TableRowColumn><a style={collectionStyles.href} href={url+'api/albums/'+track.album.id}>{ track.album.name }</a></TableRowColumn>
  //         <TableRowColumn><a style={collectionStyles.href} href={url+'api/genres/'+track.genre.id}>{ track.genre.name }</a></TableRowColumn>
  //         <TableRowColumn>{ track.play_count }</TableRowColumn>
  //       </TableRow>
  //     ))
  //     return arr;
  //   }
  // }
  renderTrackItemMenu() {
    return(
      <IconMenu
        iconButtonElement={<IconButton iconClassName="material-icons">more_vert</IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
        <MenuItem primaryText="Profile" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }
  renderTracksListItems(tracks) {
    if (tracks) {
      let arr = tracks.map((track) => (
          <MenuItem
            key={'track_list_item_'+ track.id}
            animation={null}
            innerDivStyle={{padding:0}}
            // primaryText={track.name}
            // secondaryText={track.artist.name + ' - ' + track.duration}
            value={track}>
            <Divider/>
            <ListItem
              disabled={true}
              primaryText={track.name}
              secondaryText={track.artist.name + ' - ' + track.duration}
              leftAvatar={
                <Avatar
                  style={{borderRadius:'0%'}}
                  src={track.album.artwork ? track.album.artwork : url+'static/images/default-artwork.png'}/>}
              rightIconButton={this.renderTrackItemMenu()}/>
          </MenuItem>
      ))
      return arr;
    }
  }
  renderTracksList() {
    const {tracks} = this.props;
    return(
      <Menu
        autoWidth={false}
        desktop={true}
        width={'100vw'}
        listStyle={{height:'calc(100vh - 172px)', overflowY:'auto', paddingTop:0, marginTop:0}}
        // menuItemStyle={{padding:0}}
        selectedMenuItemStyle={{backgroundColor:'red'}}
        multiple={true}
        onChange={this.handleChange}
        value={this.props.selectedTracks}>
        {this.renderTracksListItems(tracks.results)}
      </Menu>
    );
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
  render() {
    return (this.renderTracksList());
  }
}
export class ArtistsCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderArtistTiles(artists) {
    if (artists) {
      let arr = artists.map((tile) => (
        <GridTile
          key={'artistTile_'+ tile.id}
          title={tile.name}
          subtitle={tile.genre.name}
          cols={1}
          rows={1}
          style={collectionStyles.artistTile.root}
          >
          <img style={collectionStyles.artistTile.img} src={tile.cover_photo ? tile.cover_photo : url+'static/images/default-avatar.png'}/>
        </GridTile>
      ))
      return arr;
    }
  }
  render() {
    const {artists} = this.props;
    return(
      <div style={collectionStyles.root}>
      <GridList
        cols={8}
        cellHeight={'auto'}
        style={collectionStyles.gridList}>
        {this.renderArtistTiles(artists.results)}
        </GridList>
      </div>
    );
  }
}

export class AlbumsCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderAlbumTiles(albums) {
    if (albums) {
      let arr = albums.map((tile) => (
        <GridTile
          key={'albumTile_'+ tile.id}
          title={tile.name}
          subtitle={tile.artist.name}
          cols={1}
          rows={1}
          >
          <img style={collectionStyles.artistTile.img} src={tile.artwork ? tile.artwork : url+'static/images/default-artwork.png'}/>
        </GridTile>
      ))
      return arr;
    }
  }
  render() {
    const {albums} = this.props;
    return(
      <div style={collectionStyles.root}>
      <GridList
        cols={8}
        cellHeight={'auto'}
        style={collectionStyles.gridList}>
        {this.renderAlbumTiles(albums.results)}
        </GridList>
      </div>
    );
  }
}
