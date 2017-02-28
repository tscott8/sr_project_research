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
  // render() {
  //   return (
  //     <div style={gridStyle.root}>
  //       <GridList
  //         cellHeight={'auto'}
  //         style={gridStyle.gridList}>
  //         <GridTile
  //             key={'miniPlayer'}
  //             cols={2}
  //             rows={2}>
  //             <MiniPlayer
  //                onNext={this.props.onNext}
  //                onPlay={this.props.onPlay}
  //                onPrevious={this.props.onPrevious}
  //                onToggleRepeat={this.props.onToggleRepeat}
  //                onToggleLoop={this.props.onToggleLoop}
  //                onSetTime={this.props.onSetTime}
  //                percent={this.props.percent}
  //                isRepeating={this.props.isRepeating}
  //                isLooping={this.props.isLooping}
  //               queue={this.props.queue}
  //               currentID={this.props.currentID}/>
  //           </GridTile>
  //           <GridTile>
  //             {this.renderQueue()}
  //           </GridTile>
  //       </GridList>
  //     </div>
  //   );
  // }
  render(){
    return (
      <div style={{height:'inherit'}}>
        <MiniPlayer
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
        </div>
    );
  }
}
