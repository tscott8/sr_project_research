import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as TrackActions from '../actions/TrackActions'
import { Card, CardMedia, CardTitle, Dialog, FlatButton, FloatingActionButton, FontIcon} from 'material-ui'
import ListDialog from './ListDialog'


const styles = {
  card: {

  },
   cardButton: {
     width:'100%',
     bottom:0,
     position:'absolute',
     backgroundColor:  'rgba(0, 0, 0, 0.5)',
     label: {
       padding:0,
       marginLeft:4,
       marginRight:4,
       textOverflow:'clip',
       fontSize:'1.2rem'
     }
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
         expanded: false,
      }
   }

   // componentDidMount() {
   //
   //    this.setState({
   //       tracks: dispatch(TrackActions.getAlbumTracks(this.props.id))
   //    });
   // }
   handleExpand = () => {
     this.setState({expanded: true});
  };

   handleClose = () => {
      this.setState({expanded: false});
   }

   handleExpandChange = (expanded) => {
      this.setState({expanded: !expanded});
   };
   handleToggle = () => {
      const { dispatch } = this.props;
      dispatch(TrackActions.getAlbumTracks(this.props.id));
    this.setState({expanded: !this.state.expanded});
  };

   render() {
      const { name, imgURL } = this.props;
      // console.log('IN TILE!')
      return (
         <div>
            <Card style={styles.card}
               expandable={true}
               expanded={this.state.expanded}
               initiallyExpanded={false}
               onExpandChange={this.handleExpandChange}
               >

               <CardMedia
                overlayContentStyle={{padding:0}}
                overlay={
                  <FlatButton
                   style={styles.cardButton}
                   onClick={this.handleToggle}
                   label={name}
                   labelStyle={styles.cardButton.label}/>
                }>
                <img style={styles.img} src={imgURL} />
               </CardMedia>
            </Card>
            <ListDialog
              name={name}
              open={this.state.expanded}
              onClose={this.handleClose}
              select={this.props.select }
              id={this.props.id}
              selectedTracks={this.props.selectedTracks}/>
         </div>

      );
   }
}
