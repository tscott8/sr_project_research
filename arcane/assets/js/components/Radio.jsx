import React, { Component } from 'react'
import {FlatButton, IconButton, ListItem} from 'material-ui'
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card'
import Slider from 'react-slick'
import clone from 'lodash/clone';
import RadioTile from './RadioTile'
const url = "http://localhost:8000/";

const settings = {
   dots: false,
   infinite: false,
   arrows: false,
   autoPlay: false,
   slidesToShow: 1,
   slidesToScroll: 1,
   centerMode: true,
   fade: false,
   adaptiveHeight: true,
   focusOnSelect: true
}
const styles = {
   outerDiv:  {
     display: 'flex',
     flexDirection:'column',
     justifyContent:'center',
      top:0,
      bottom:0,
      maxWidth:'60%',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:'1%'
   },
   innerDiv: {
    }
}


export default class Radio extends Component  {
  constructor(props){
    super(props);
    this.state= {
      hover:false
    }
  }

  componentDidUpdate(prevProps, nextState) {
   //   console.info("Radio component updated!");
   //   console.info("RADIO UPDATING", prevProps);
     this.refs.radioSlider.slickGoTo(this.props.tracks.completed.length);
 }

  handleHover() {this.setState({hover: true})}
  handleLeave() {this.setState({hover: false})}

  getPulse(track) {
    if (this.props.tracks.currentlyPlaying && track.id === this.props.tracks.currentlyPlaying.id){
          return "button-pulse"
      }
    else {
      return null
    }
  }
  renderSlides(tracks) {
   //   console.log(tracks.currentlyPlaying);
     if (tracks.length > 0) {
       let arr = tracks.map((tile) => (
         <div
           key={'radio_card_' + (tile === null ? -1 : tile.id)}

         >
           <RadioTile
             {...this.props}
             className={this.getPulse(tile)}
             id={tile ? tile.id : -1}
             imgURL={tile && tile.album.artwork ? tile.album.artwork : url+'static/images/default-artwork.png'}
             subtitle={tile ? tile.artist.name : 'No Artist'}
             title={ tile ? tile.name : -1}
           />
         </div>
       ))
       return arr;
     }
     else {
       return (<div></div>);
     }
  }

  render() {
    const {tracks} = this.props;
    let list = tracks.completed.map(clone);
    list.push(tracks.currentlyPlaying);
    // console.log("IN radio RENDER upcoming", tracks.upcoming);
    list = list.concat(tracks.upcoming);
      return (
        <div
          style={styles.outerDiv}
        >
          <Slider {...settings} ref="radioSlider">
             {this.renderSlides(list)}
          </Slider>
        </div>
      );
  }
}
