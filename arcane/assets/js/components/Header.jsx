import React, { Component } from 'react'
import { AppBar,Drawer,IconMenu, IconButton, DropdownMenu, AutoComplete, MenuItem} from 'material-ui'
import ArcaneDrawer from './ArcaneDrawer'
import RadioDrawer from './RadioDrawer'

export class RightActions extends Component {
  constructor(props){
    super(props);
  }
    render() {
      return (
        <div>
          <IconButton
            onClick={this.props.searchClick}
            iconClassName="material-icons">search</IconButton>
          <IconMenu
             iconButtonElement={<IconButton iconClassName="material-icons">person</IconButton>}
             targetOrigin={{horizontal: 'right', vertical: 'top'}}
             anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
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
  renderTitle() {
    return(
      <div>
        <div>Arcane / {this.getPageName()}</div>
        {/* {this.renderSearchField()} */}
      </div>
    );
  }
  renderSearchField() {
      return (this.state.searching === true ? <AutoComplete
                                                id={'searchField'}
                                                fullWidth={true}
                                               hintText="Type anything"/> : "");
  }
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
              onRequestChange={(rightOpen) => this.setState({rightOpen})}/>
            <AppBar
              title={"Arcane"+ this.props.currentPage}
              primary={true}
              iconElementRight={<RightActions
                                  searchClick={this.handleSearchClick.bind(this)}
                                  drawerClick={this.handleRightToggle.bind(this)}/>}
              onLeftIconButtonTouchTap={this.handleLeftToggle.bind(this)}/>

          </div>
      );
  }
}
