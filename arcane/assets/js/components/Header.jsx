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
const titleStyles = {
  root: {
    display:'inline-flex',
    width:'100%',
    height:'inherit'
  },
  title: {
    width:'50%'
  },
  search: {
      width: '50%',
      float:'right',
  }
};
export class Title extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div style={titleStyles.root}>
        <span style={titleStyles.title}>{"Arcane" + this.props.currentPage}</span>
        <span style={titleStyles.search}><ExpandingSearchBox dataSource={[]}/></span>
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
              onRequestChange={(rightOpen) => this.setState({rightOpen})}/>
            <AppBar
              title={<Title currentPage={this.props.currentPage}/>}
              primary={true}
              onLeftIconButtonTouchTap={this.handleLeftToggle.bind(this)}
              iconElementRight={
                <RightActions
                  searching={this.state.searching}
                  searchClick={this.handleSearchClick.bind(this)}
                  drawerClick={this.handleRightToggle.bind(this)}/>}
            />

          </div>
      );
  }
}
