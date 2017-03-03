import React, { Component } from 'react'
import { Card, CardMedia, CardTitle, Dialog, FlatButton } from 'material-ui'
import ListDialog from './ListDialog'


const styles = {
   card: {
      width: 'inherit',
      height: 'inherit'
   },
   img: {
      width: 'inherit',
      height: 'inherit',
      margin: 'auto'
   }
}

export default class Tile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         expanded: false
      }
   }

   handleClose = () => {
      this.setState({expanded: false});
   }

   handleExpandChange = (expanded) => {
      console.info("Expanded? ", expanded);
      this.setState({expanded: expanded});
   };

   render() {
      const { name, imgURL } = this.props;
      return (
         <div>
            <Card style={styles.card}
               expandable={true}
               expanded={this.state.expanded}
               initiallyExpanded={false}
               onExpandChange={this.handleExpandChange}
               >
               <CardMedia
                  overlay={<CardTitle title={name} />}>
                  <img style={styles.img} src={imgURL} />
               </CardMedia>
               <CardTitle
                  title={name}
                  actAsExpander={true} />
            </Card>
            <ListDialog name={name} open={this.state.expanded} onClose={this.handleClose} tracks={this.props.tracks} selectedTracks={this.selectedTracks} select={this.props.select} />
         </div>

      );
   }
}
