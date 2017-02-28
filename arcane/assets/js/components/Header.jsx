import React, { Component } from 'react'
import { AppBar,Drawer,IconMenu, IconButton, DropdownMenu, AutoComplete, MenuItem} from 'material-ui'
import ArcaneDrawer from './ArcaneDrawer'
import RadioDrawer from './RadioDrawer'
import SearchBox from './SearchBox'
import makeExpanding from './ExpandingAnimation';

const ExpandingSearchBox = makeExpanding(SearchBox);

export class RightActions extends Component {
  constructor(props){
    super(props);
  }
    render() {
      return (
        <div>
          <ExpandingSearchBox dataSource={[]}/>
          <IconMenu
             iconButtonElement={<IconButton iconClassName="material-icons">person</IconButton>}
             targetOrigin={{horizontal: 'right', vertical: 'top'}}
             anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
             <MenuItem primaryText="Profile" />
             <MenuItem primaryText="Help" />
             <MenuItem primaryText="Sign out" />
           </IconMenu>
          <IconButton
            onClick={this.props.drawerClick}
            iconClassName="material-icons">queue_music</IconButton>
        </div>

      );
    }
}



export default class Header extends Component  {

  constructor(props){
    super(props);
    this.state = {
      leftOpen:false,
      rightOpen:false,
      searching:false
    };
  }
  handleSearchClick() { this.setState({searching: !this.state.searching}); }
  handleLeftToggle () { this.setState({leftOpen: !this.state.leftOpen}); }
  handleRightToggle() { this.setState({rightOpen: !this.state.rightOpen}); }
  handleLeftClose() { this.setState({leftOpen: false}); }
  handleRightClose() { this.setState({rightOpen: false}); }

  render() {
      return (
          <div>
            <ArcaneDrawer
              open={this.state.leftOpen}
              handleClose={this.handleLeftClose.bind(this)}
              onRequestChange={(leftOpen) => this.setState({leftOpen})}/>
            <RadioDrawer
              open={this.state.rightOpen}
              handleClose={this.handleRightClose.bind(this)}
              onRequestChange={(rightOpen) => this.setState({rightOpen})}
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
            <AppBar
              titleStyle={{maxWidth:'33vw'}}
              title={"Arcane" + this.props.currentPage}
              primary={true}
              onLeftIconButtonTouchTap={this.handleLeftToggle.bind(this)}
              iconElementRight={
                <RightActions
                  searching={this.state.searching}
                  searchClick={this.handleSearchClick.bind(this)}
                  drawerClick={this.handleRightToggle.bind(this)}/>}
              iconStyleRight={{maxWidth:'66vw'}}
            />
          </div>
      );
  }
}
