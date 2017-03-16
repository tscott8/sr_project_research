import React, { Component, PropTypes } from 'react'
import { FloatingActionButton, FontIcon, Snackbar } from 'material-ui'
import { connect } from 'react-redux'
import CollectionTabs  from '../components/CollectionTabs'

const style = {
  fab: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    marginBottom: '5vh',
    marginLeft: '5vh'
  },
}
class MyMusic extends Component {

  constructor(props) {
    super(props);
    this.state = { selected: [], snackOpen:false, snackMessage: 'Added nada!' };
    // const { dispatch } = this.props;
    // dispatch(TrackActions.getTracks());
    // dispatch(AlbumActions.getAlbums());
    // dispatch(ArtistActions.getArtists());
    // dispatch(GenreActions.getGenres());
  }

  addToSelected(items) {
    // console.log('selected items:', items)
    this.setState({
      selected: items
    });
  }
  pushToQueue() {
    // const { dispatch } = this.props;
    console.log('IN PUSH TO QUEUE', this.state.selected)
    // this.props.pushToQueue(this.state.selected[0]);
    this.setState({snackOpen:true, snackMessage:'Added '+this.state.selected.length+' items to the queue',selected:[]})
    // this.setState({selected:[]})
  }
  handleActionTouchTap = () => {
   this.setState({
     snackOpen: false,
   });
  };
  handleRequestClose = () => {
   this.setState({
     snackOpen: false,
   });
  };
  renderAddQueueButton() {
    if (this.state.selected.length > 0) {
      return(
        <FloatingActionButton
          onClick={this.pushToQueue.bind(this)}
          style={style.fab} >
          <FontIcon className="material-icons">queue</FontIcon>
        </FloatingActionButton>
      );
    }
  }

  render() {
    const { genres, tracks, artists, albums, dispatch } = this.props;
      return (
        <div>
          <CollectionTabs
             dispatch={dispatch}
               genres={genres}
               tracks={tracks}
               artists={artists}
               albums={albums}
               select={this.addToSelected.bind(this)}
               selectedTracks={this.state.selected}
               />
           {this.renderAddQueueButton()}
           <Snackbar
             open={this.state.snackOpen}
             message={this.state.snackMessage}
             action="undo"
             autoHideDuration={this.state.autoHideDuration}
             onActionTouchTap={this.handleActionTouchTap}
             onRequestClose={this.handleRequestClose}
           />
        </div>
      );
  }
}

MyMusic.propTypes = {
  dispatch: PropTypes.func.isRequired,
  genres: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  albums: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  const {genres, artists, albums, tracks} = state
  return { genres, artists, albums, tracks};
}

export default connect(mapStateToProps)(MyMusic);
