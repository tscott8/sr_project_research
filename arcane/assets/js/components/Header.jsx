import React, { Component } from 'react'
import { AppBar } from 'material-ui'
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

  handleLeftClose = () => { this.setState({leftOpen: false}); }

  handleRightClose = () => { this.setState({rightOpen: false}); }

  handleLeftToggle = () => { this.setState({leftOpen: !this.state.leftOpen}); }

  handleRightToggle = () => { this.setState({rightOpen: !this.state.rightOpen}); }

  handleSearchClick = () => { this.setState({searching: !this.state.searching}); }

    getSearchResults = (query) => {
      fetch(host + "?query=" + query)
      .then(response => response.json())
      .then(json => (this.setState({
        dataSource: json.results
      })))
    }

  render() {
    return (
      <div>
        <ArcaneDrawer
          onClose={this.handleLeftClose}
          onRequestChange={(leftOpen) => this.setState({leftOpen})}
          open={this.state.leftOpen}
        />
        <NowPlayingDrawer
          {...this.props}
          onClose={this.handleRightClose}
          onRequestChange={(rightOpen) => this.setState({rightOpen})}
          open={this.state.rightOpen}
        />
        <AppBar
          iconElementRight={
            <RightActions
              dataSource={this.state.dataSource}
              onDrawerClick={this.handleRightToggle}
              onSearchClick={this.handleSearchClick}
              onUpdate={this.getSearchResults}
              searching={this.state.searching}
            />}
          iconStyleRight={{maxWidth:'66vw'}}
          onLeftIconButtonTouchTap={this.handleLeftToggle}
          primary
          title={"Arcane" + this.props.currentPage}
          titleStyle={{maxWidth:'33vw'}}
        />
      </div>
      );
  }
}
