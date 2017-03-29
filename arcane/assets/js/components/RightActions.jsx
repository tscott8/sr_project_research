import React from 'react'
import { IconMenu, IconButton, FontIcon, MenuItem, Avatar} from 'material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable';
import SearchBox from './SearchBox'
import makeExpanding from './ExpandingAnimation';

const ExpandingSearchBox = muiThemeable()(makeExpanding(SearchBox));

const styles = {
   userAvatar: {
      top: '0'
   }
}

const RightActions = (props) => (
  <div>
    <ExpandingSearchBox {...props} />
    <IconMenu
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      iconButtonElement={props.currentUser.avatar ?
         <Avatar
             src={props.currentUser.avatar}
             style={styles.userAvatar}
            /> :
         <Avatar
            icon={<FontIcon className="material-icons">{"person"}</FontIcon>}
            />}
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
