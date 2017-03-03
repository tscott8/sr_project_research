import React, { Component } from 'react'
import { Card, CardMedia, CardTitle, Dialog, FlatButton, FloatingActionButton, FontIcon} from 'material-ui'
import ListDialog from './ListDialog'


const styles = {
   card: {
      width: 'calc(100vw/6)',
      height:'calc(100vw/6)',
   },
   img: {
      width: 'inherit',
      height: 'inherit',
      margin: 'auto'
   },
   fab: {
      float: 'right',
      top:0,
      right:0,
      position:'absolute',
      margin:20,
      zIndex:1
   }
}

export default class Tile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         expanded: false
      }
   }
   handleExpand = () => {
     this.setState({expanded: true});
  };

   handleClose = () => {
      this.setState({expanded: false});
   }

   handleExpandChange = (expanded) => {
      console.info("Expanded? ", expanded);
      this.setState({expanded: expanded});
   };

   handleToggle = () => {
    console.log('click')
    this.setState({expanded: !this.state.expanded});
  };

   render() {
      const { name, imgURL } = this.props;
      console.log('IN TILE!')
      return (
         <div>
            <Card style={styles.card}
               expandable={true}
               expanded={this.state.expanded}
               initiallyExpanded={false}
               onExpandChange={this.handleExpandChange}
               >

               <CardMedia
                //  actAsExpander
                //  showExpandableButton
                overlayContentStyle={{padding:0,height:'calc(100vw/6)'}}
                 overlay={<FlatButton
                   style={{width:'100%', bottom:0, position:'absolute'}}
                   onClick={this.handleToggle}
                   label={name}
                   labelStyle={{fontSize:'1.5rem'}}/>}
                >
                <img style={styles.img} src={imgURL} />
               </CardMedia>
               {/* <CardTitle
                  title={name}
                  actAsExpander={true} /> */}
            </Card>
            <ListDialog
              name={name}
              open={this.state.expanded}
              onClose={this.handleClose}
              tracks={this.props.tracks}
              select={this.props.select }
              selectedTracks={this.props.selectedTracks}/>
         </div>

      );
   }
}
