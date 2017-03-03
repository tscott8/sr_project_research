import React, { Component } from 'react'
import { Card, CardMedia, CardTitle, Dialog, FlatButton, FloatingActionButton, FontIcon} from 'material-ui'
import ListDialog from './ListDialog'


const styles = {
   card: {
   },
   img: {
     maxHeight:'calc(100vw/8)',
     maxWidth: 'calc(100vw/8)',
     minHeight: 100,
     minWidth: 100,
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
                overlayContentStyle={{padding:0}}
                overlay={<FlatButton
                   style={{width:'100%', bottom:0, position:'absolute', backgroundColor:  'rgba(0, 0, 0, 0.5)'}}
                   onClick={this.handleToggle}
                   label={name}
                   labelStyle={{padding:0,marginLeft:4,marginRight:4, textOverflow:'clip',
                    fontSize:'1.2rem'}}/>}
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
