import React, { Component } from 'react'
import {FlatButton, IconButton, ListItem} from 'material-ui'
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card'
import Slider from 'react-slick'

const settings = {
   dots: false,
   infinite: true,
   arrows: true,
   autoPlay: false,
   autoPlaySpeed: 1,
   pauseOnHover: true,
   slidesToShow: 3,
   slidesToScroll: 1,
   centerMode: true,
   fade: false,
   adaptiveHeight: true
}

const styles = {
   outerDiv: {
      display: 'block',
      maxHeight:'100vh',
      maxWidth:'100vh',
      margin: 'auto',
      marginTop:10,
     },
   innerDiv: {
      maxWidth: 'inherit',
      maxHeight:'inherit',
      padding:5,
      card: {
        height:'100%',
        img: {
          // height:'100%'
        },
        overlay: {
          // padding:4,
          // top:0,
          // position:'absolute',
          height:'50vh',
          width:'100%',
          topActions: {
            width:'100%',
            top:0,
            position:'absolute'
          },
          bottomActions: {
            fontSize:'2em',
            lineHeight:'28px',
            textShadow:'1px 2px black',
            bottom:0,
            right:0,
            position:'absolute',
            width:'100%',
            // marginLeft:'20%',
            // marginRight:'20%'
          }
        },
      },
    }
}


export default class Radio extends Component  {
  constructor(props){
    super(props);
    this.state= {
      hover:false
    }
  }
  handleHover() {this.setState({hover: true})}
  handleLeave() {this.setState({hover: false})}
  renderOverlay (track) {
    if (this.state.hover) {
      return (
        <div id="overlay_container" style={styles.innerDiv.card.overlay}>
          <div style={styles.innerDiv.card.overlay.topActions}>
            <IconButton iconClassName="material-icons">check</IconButton>
            <IconButton
              style={{float:'right'}}
              iconClassName="material-icons"
              hoveredStyle={{color:'red'}}
              >close</IconButton>
          </div>
          <ListItem
            style={styles.innerDiv.card.overlay.bottomActions}
            primaryText={track.name}
            secondaryText={track.artist.name}
            rightIconButton={ <IconButton iconClassName="material-icons">more_vert</IconButton>}
            disabled={true}
          />
        </div>
      );
    }
  }
  renderSlides(tracks) {
    if (tracks) {
      let arr = tracks.map((track) => (
        <div style={styles.innerDiv} onMouseEnter={this.handleHover.bind(this)} onMouseLeave={this.handleLeave.bind(this)}>
           <Card style ={styles.innerDiv.card} key={'radio_card_'+track.id}>
             <CardMedia overlay={this.renderOverlay(track)}>
               <img style={styles.innerDiv.card.img} src={ track.album.artwork ? track.album.artwork : "http://localhost:8000/static/images/default-artwork.png"} />
             </CardMedia>
           </Card>
         </div>
      ))
    return arr;
  }
  else {
    return (<div><img src="http://localhost:8000/static/images/default-artwork.jpg" style={styles.innerDiv} /></div>);
  }
  }
  render() {
    const {tracks} = this.props;
      return (
        <div style={styles.outerDiv}>
           <Slider {...settings}>
             {this.renderSlides(tracks.allTracks.results)}
          </Slider>
        </div>
      );
  }
}
