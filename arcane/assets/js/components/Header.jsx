import React, { Component } from 'react'
import { AppBar, Drawer} from 'material-ui'
import ArcaneDrawer from './ArcaneDrawer'
import NowPlayingDrawer from './NowPlayingDrawer'
import RightActions from './RightActions';


const host = 'http://localhost:8000/api/search/'

export default class Header extends Component  {

  constructor(props){
    super(props);
    this.state = {
      leftOpen:false,
      rightOpen:false,
      searching:false,
      dataSource: []
    };
  }
  handleSearchClick() { this.setState({searching: !this.state.searching}); }
  handleLeftToggle () { this.setState({leftOpen: !this.state.leftOpen}); }
  handleRightToggle() { this.setState({rightOpen: !this.state.rightOpen}); }
  handleLeftClose() { this.setState({leftOpen: false}); }
  handleRightClose() { this.setState({rightOpen: false}); }
  getSearchResults = (query) => {
     fetch(host + "?query=" + query)
     .then(response => response.json())
     .then(json => (this.setState({
        dataSource: json.results
     }), console.log(json.results)))

  }

  render() {
      return (
          <div>
            <ArcaneDrawer
              open={this.state.leftOpen}
              handleClose={this.handleLeftClose.bind(this)}
              onRequestChange={(leftOpen) => this.setState({leftOpen})}/>
            <NowPlayingDrawer
              open={this.state.rightOpen}
              handleClose={this.handleRightClose.bind(this)}
              onRequestChange={(rightOpen) => this.setState({rightOpen})}
              onNext={this.props.onNext}
              onPlay={this.props.onPlay}
              onPrevious={this.props.onPrevious}
              onToggleShuffle={this.props.onToggleShuffle}
              onToggleLoop={this.props.onToggleLoop}
              onSetTime={this.props.onSetTime}
              percent={this.props.percent}
              isShuffling={this.props.isShuffling}
              isLooping={this.props.isLooping}
              isPlaying={this.props.isPlaying}
              queue={this.props.queue}
              currentID={this.props.currentID}/>
            <AppBar
              titleStyle={{maxWidth:'33vw'}}
              title={"Arcane" + this.props.currentPage}
              primary={true}
              onLeftIconButtonTouchTap={this.handleLeftToggle.bind(this)}
              iconElementRight={
                <RightActions
                  searching={this.state.searching}
                  searchClick={this.handleSearchClick.bind(this)}
                  dataSource={this.state.dataSource}
                  onUpdate={this.getSearchResults}
                  drawerClick={this.handleRightToggle.bind(this)}/>}
              iconStyleRight={{maxWidth:'66vw'}}
            />
          </div>
      );
  }
}
