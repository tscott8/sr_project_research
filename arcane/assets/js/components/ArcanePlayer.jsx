import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui'
import MiniPlayer from './MiniPlayer'
const gridStyle = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height:'auto',
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
};
export default class ArcanePlayer extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div style={gridStyle.root}>
        <GridList
          cellHeight={'auto'}
          style={gridStyle.gridList}>
          <GridTile
              key={'miniPlayer'}
              cols={2}
              rows={2}>
              <MiniPlayer/>
            </GridTile>
        </GridList>
      </div>
    );
  }
}
