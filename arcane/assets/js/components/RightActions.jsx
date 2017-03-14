import React, { Component } from 'react'
import { IconMenu, IconButton, MenuItem} from 'material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable';
import SearchBox from './SearchBox'
import makeExpanding from './ExpandingAnimation';

const ExpandingSearchBox = muiThemeable()(makeExpanding(SearchBox));

const RightActions = (props) => (
        <div>
          <ExpandingSearchBox dataSource={[]}/>
          <IconMenu
            iconStyle={{color: props.muiTheme.palette.alternateTextColor}}
            iconButtonElement={<IconButton iconClassName="material-icons">person</IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
            <MenuItem primaryText="Profile" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>
          <IconButton
            iconStyle={{color: props.muiTheme.palette.alternateTextColor}}
            onClick={props.drawerClick}
            iconClassName="material-icons">queue_music</IconButton>
        </div>

      );
export default muiThemeable()(RightActions);
