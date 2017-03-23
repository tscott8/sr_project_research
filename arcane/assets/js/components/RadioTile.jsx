import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import * as TrackActions from '../actions/TrackActions'
// import * as AlbumActions from '../actions/AlbumActions'
// import * as ArtistActions from '../actions/ArtistActions'
import { IconButton } from 'material-ui'
import { CardTitle} from 'material-ui/Card'

const styles = {
  root: {
    width:'100%',
    height:'inherit',
  },
  overlay: {
    width:'inherit',
    height:'100%',
    backgroundColor:  'rgba(0, 0, 0, 0.6)',
    left:0,
    bottom:0,
    right:0,
    lineHeight:1.3,
    textShadow:'1px 1px black',
    topActions: {
        top:0,
        height:'50%',
        width:'100%'
    },
    bottomActions: {
        height:'50%',
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        bottom:0,
        button: {
          marginTop:'auto',
          float:'right',
          top:-24
        },
        label: {
          marginTop:'auto',
          maxWidth:'85%',
          left:0,
          bottom:0,
          title: {
           bottom:0,
           left:15,
           right:0,
           width:'100%',
           textShadow:'1px 1px black',
           whiteSpace:'no-wrap'
          },
          subtitle: {
            bottom:0,
            left:15,
            right:0,
            width:'100%',
            textOverflow:'clip',
            textShadow:'1px 1px black',
            whiteSpace:'no-wrap'
          }
        }
    }
  }
}
class RadioTile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         hover:false
      }
   }
   handleHover = () => {this.setState({hover: true})}
   handleLeave = () => {this.setState({hover: false})}

   renderOverlay () {
      const { title, subtitle} = this.props;
      if (this.state.hover) {
       return (
         <div
           id="overlay_container"
           style={styles.overlay}
         >
           <div style={styles.overlay.topActions}>
             <IconButton iconClassName="material-icons">check</IconButton>
             <IconButton
               hoveredStyle={{color:'red'}}
               iconClassName="material-icons"
               style={{float:'right'}}
             >close</IconButton>
           </div>
           <div style={styles.overlay.bottomActions}>
             <CardTitle
               style={styles.overlay.bottomActions.label}
               subtitle={subtitle}
               subtitleStyle={styles.overlay.bottomActions.label.subtitle}
               title={title}
               titleStyle={styles.overlay.bottomActions.label.title}
             />
             <IconButton
               iconClassName="material-icons"
               style={styles.overlay.bottomActions.button}
             >more_vert</IconButton>
           </div>
         </div>
       );
     }
    }
   render()  {
     const { imgURL, className } = this.props;
     return (
       <div
         className={className}
         onMouseEnter={this.handleHover}
         onMouseLeave={this.handleLeave}
         style={{
           height:'80vh',
           width: '80vh',
           maxWidth:'90vw',
           maxHeight:'90vw',
           margin:20,
           marginLeft: 'auto',
           marginRight: 'auto',
           //  marginTop:'auto',
           //  marginBottom:'auto',
           padding:0,
           background: 'url('+ imgURL + ') ',
           backgroundSize: 'cover',
           backgroundPosition:'center center',
           borderRadius:1

         }}>
         <div style={styles.root}>{this.renderOverlay()}</div>
         </div>

    );
 }
}
RadioTile.propTypes = {
   dispatch: PropTypes.func.isRequired,
   tracks:   PropTypes.object.isRequired,
   albums:   PropTypes.object.isRequired,
   artists:  PropTypes.object.isRequired
}

function mapStateToProps(state) {
   const { tracks, albums, artists} = state
   return { tracks, albums, artists };
}

export default connect(mapStateToProps)(RadioTile);
