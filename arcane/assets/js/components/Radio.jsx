import React, { Component } from 'react'
import {FlatButton, IconButton, ListItem} from 'material-ui'
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card'
import Slider from 'react-slick'
import RadioTile from './RadioTile'
const url = "http://localhost:8000/";

const settings = {
   dots: false,
   infinite: false,
   arrows: true,
   autoPlay: false,
   slidesToShow: 1,
   slidesToScroll: 1,
   centerMode: true,
   fade: false,
   adaptiveHeight: true,
   focusOnSelect: true,
  //  variableWidth:true
}

const styles = {
   outerDiv: {
      display: 'block',
      maxWidth:'60%',
      margin: 'auto',
      marginTop:'5vh',
      marginBottom:'5vh'
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
  handleHover() {this.setState({hover: true})}
  handleLeave() {this.setState({hover: false})}

  renderSlides(tracks) {
  if (tracks) {
    let arr = tracks.map((tile) => (
      <div key={'radio_card_'+ tile.id}
      >
        <RadioTile

          {...this.props}
          id={tile.id}
          imgURL={tile.album.artwork ? tile.album.artwork : url+'static/images/default-artwork.png'}
          subtitle={tile.artist.name}
          title={tile.name}
        />
      </div>
    ))
    return arr;
  }
  else {
    return (<div><h2>Nothin to see here!</h2></div>);
  }
  }
  render() {
    const {tracks} = this.props;
      return (
        <div
          style={styles.outerDiv}
        >
          <Slider {...settings}>
             {this.renderSlides(tracks.allTracks.results)}
          </Slider>
        </div>
      );
  }
}
