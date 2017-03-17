import React from 'react'
import { IconMenu, IconButton, MenuItem} from 'material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable';
import SearchBox from './SearchBox'
import makeExpanding from './ExpandingAnimation';

const ExpandingSearchBox = muiThemeable()(makeExpanding(SearchBox));

const RightActions = (props) => (
  <div>
    <ExpandingSearchBox
      {...props}
      // dataSource={props.dataSource}
      // onUpdate={props.onUpdate}
    />
    <IconMenu
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      iconButtonElement={<IconButton iconClassName="material-icons">person</IconButton>}
      iconStyle={{color: props.muiTheme.palette.alternateTextColor}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Profile" />
      <MenuItem primaryText="Help" />
      <MenuItem primaryText="Sign out" />
    </IconMenu>
    <IconButton
      iconClassName="material-icons"
      iconStyle={{color: props.muiTheme.palette.alternateTextColor}}
      onClick={props.onDrawerClick}
    >queue_music</IconButton>
  </div>
);
export default muiThemeable()(RightActions);
