import React, { Component } from 'react'
import {FlatButton, IconButton} from 'material-ui'
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card'
import Slider from 'react-slick'
import MiniPlayer from './MiniPlayer2'

const settings = {
   dots: false,
   infinite: true,
   arrows: true,
   autoplay: false,
   autoplaySpeed: 1,
   pauseOnHover: true,
   slidesToShow: 1,
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
      // maxWidth: 600,
      // minWidth:'33vw',
      // height:'calc((100vh-128px)/2)',
      // minHeight:'33vh',
      margin: 'auto',
      marginTop:10,
      // marginBottom:20
      /*maxHeight: '25vh',
      marginBottom: '42vh'*/
   },
   innerDiv: {
      maxWidth: 'inherit',
      maxHeight:'inherit',
      // maxHeight: 'calc(inherit-20px)1',
      // textAlign:'center',
      // margin: '0 15px 15px 0',
      padding:5,
      card: {
        height:'100%',
        img: {
          // height:'100%'
        },
        overlay: {
          // padding:4,
          height:'100%',
          // overflow:'hidden',
          // position:'relative',
          width:'100%',
          display:'table',
          topActions: {
            display:'table-row',
            width:'100%',
            height:530
          },
          text: {
            display:'table-row',
            textAlign:'center'
          },
          bottomActions: {
            display:'table-row'

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
          <div style={styles.innerDiv.card.overlay.text}>
            <CardTitle title={track.name} subtitle={track.artist.name}/>
          </div>
          {/* <div>
            <IconButton iconClassName="material-icons">thumbs_up</IconButton>
            <IconButton iconClassName="material-icons">thumbs_down</IconButton>
          </div> */}
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
             {this.renderSlides(tracks.results)}
          </Slider>
          {/* <MiniPlayer/> */}
        </div>
      );
  }
}
