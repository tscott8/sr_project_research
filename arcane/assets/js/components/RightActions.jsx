import React from 'react'
import { IconMenu, IconButton, FontIcon, MenuItem, Avatar} from 'material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable';
import SearchBox from './SearchBox'
import makeExpanding from './ExpandingAnimation';

const ExpandingSearchBox = muiThemeable()(makeExpanding(SearchBox));

const styles = {
   userAvatar: {
    //  top:7,
   }
}

const RightActions = (props) => (
  <div
    // style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}
  >
    <ExpandingSearchBox {...props} />
    <IconMenu
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      style={props.currentUser.avatar ? {display:'inline-flex',paddingLeft:12, paddingRight:12} : {}}
      iconButtonElement={props.currentUser.avatar ?
        <Avatar
          src={props.currentUser.avatar}
          // style={styles.userAvatar}
          size={24}
        /> :
        <IconButton iconClassName="material-icons">{"person"}</IconButton>}
      iconStyle={{color: props.muiTheme.palette.alternateTextColor}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    ><MenuItem primaryText="Profile" />
      <MenuItem primaryText="Help" />
      <MenuItem primaryText="Sign out" onClick={props.onSignOut}/>
    </IconMenu>
    <IconButton
      iconClassName="material-icons"
      iconStyle={{color: props.muiTheme.palette.alternateTextColor}}
      onClick={props.onDrawerClick}
    >{"queue_music"}</IconButton>
  </div>
);
export default muiThemeable()(RightActions);
