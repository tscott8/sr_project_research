import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as TrackActions from '../actions/TrackActions'
import * as AlbumActions from '../actions/AlbumActions'

import { Card, CardMedia, CardTitle, Dialog, FlatButton, FloatingActionButton, FontIcon, RaisedButton, GridTile} from 'material-ui'
import ListDialog from './ListDialog'

const styles = {
   button: {
     width:'100%',
     height:'inherit',
     bottom:0,
     label: {
       width:'inherit',
       height:'100%',
       backgroundColor:  'rgba(0, 0, 0, 0.6)',
       left:0,
       bottom:0,
       right:0,
       position:'absolute',
       lineHeight:1.3,
       textOverflow:'clip',
       textShadow:'1px 1px black',
       overflow:'hidden',
       labelText:{
         top:70,
         bottom:70,
         left:0,
         right:0,
         padding:4,
         position:'absolute'
       }
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
   },
   href: {
     color:'white',
     fontSize:'1.4rem',
     display:'block',
     maxHeight:'50%',
     overflow:'hidden',
     whiteSpace:'no-wrap'

   },
   hrefsub: {
     color:'gray',
     fontSize:'1.2rem',
     display:'block',
     textOverflow:'clip',
     maxHeight:'50%',
     overflow:'hidden',
     whiteSpace:'no-wrap'


   }
}


export default class Tile extends Component {
   constructor(props) {
      super(props);

      this.state = {
         expanded: false,
         hover:false
      }
   }

   handleHover() {this.setState({hover: true})}
   handleLeave() {this.setState({hover: false})}
   handleExpand = () => {
     const { dispatch, type} = this.props;
     type === "album" ? dispatch(TrackActions.getAlbumTracks(this.props.id)) : dispatch(AlbumActions.getArtistAlbums(this.props.id))
     this.setState({expanded: true});};
   handleClose = () => {this.setState({expanded: false});}
  //  handleExpandChange = (expanded) => {this.setState({expanded: !expanded});};
  //  handleToggle = () => {
  //    const { dispatch } = this.props;
  //    dispatch(TrackActions.getAlbumTracks(this.props.id));
  //    this.setState({expanded: !this.state.expanded});
  // };
  // renderOverlay() {
  //   const { title, subtitle } = this.props;
  //   if (this.state.hover) {
  //     return (
  //       <FlatButton
  //        style={styles.cardButton}
  //        onClick={this.handleToggle}
  //        label={<div><a style={styles.href}>{title}</a> <a style={styles.hrefsub}> {subtitle}</a></div>}
  //        labelStyle={styles.cardButton.label}/>
  //     );
  //   }
  // }
  render()  {
    const { title, subtitle, imgURL } = this.props;
    return (
          <RaisedButton
            style={styles.button}
            fullWidth={true}
             buttonStyle={{minHeight:180,padding:0, background: 'url('+ imgURL + ') ',
                    backgroundSize: 'cover', backgroundPosition:'center center'}}
            backgroundColor={'transparent'}

            //  expanded={this.state.expanded}
             onMouseEnter={this.handleHover.bind(this)}
             onMouseLeave={this.handleLeave.bind(this)}
             onClick={this.handleExpand}
             label={<div style={styles.button.label.labelText}><a style={styles.href}>{title}</a> <a style={styles.hrefsub}> {subtitle}</a></div>}
             labelStyle={this.state.hover ? styles.button.label : {display:'none'}}
           >
          <ListDialog
            title={title}
            subtitle={subtitle}
            imgURL={imgURL}
            id={this.props.id}
            open={this.state.expanded}
            onClose={this.handleClose}
            select={this.props.select }
            selectedTracks={this.props.selectedTracks}
            type={this.props.type}
          />
       </RaisedButton>

    );
 }
  //  render2() {
  //     const { title, subtitle, imgURL } = this.props;
  //     return (
  //        <div>
  //           <Card style={styles.card}
  //              expandable={true}
  //              expanded={this.state.expanded}
  //              initiallyExpanded={false}
  //              onExpandChange={this.handleExpandChange}
  //              onMouseEnter={this.handleHover.bind(this)}
  //              onMouseLeave={this.handleLeave.bind(this)}
  //              >
   //
  //              <CardMedia
  //               overlayContentStyle={{padding:0}}
  //               overlay={this.renderOverlay()
  //                 // <FlatButton
  //                 //  style={styles.cardButton}
  //                 //  onClick={this.handleToggle}
  //                 //  label={this.renderOverlay()}
  //                 //  labelStyle={styles.cardButton.label}/>
  //               }>
  //               <img style={styles.img} src={imgURL} />
  //              </CardMedia>
  //           </Card>
  //           <ListDialog
  //             title={title}
  //             subtitle={subtitle}
  //             imgURL={imgURL}
  //             id={this.props.id}
  //             open={this.state.expanded}
  //             onClose={this.handleClose}
  //             select={this.props.select }
  //             selectedTracks={this.props.selectedTracks}/>
  //        </div>
   //
  //     );
  //  }
}
