import React, { Component } from 'react'
import {} from 'material-ui'
import Slider from 'react-slick'
import MiniPlayer from './MiniPlayer2'

const settings = {
   dots: false,
   infinite: true,
   arrows: true,
   autoplay: true,
   autoplaySpeed: 1,
   pauseOnHover: true,
   slidesToShow: 1,
   slidesToScroll: 1,
   centerMode: true,
   fade: true,
   adaptiveHeight: true
}

const styles = {
   outerDiv: {
      display: 'block',
      maxWidth: '500px',
      margin: 'auto',
      /*maxHeight: '25vh',
      marginBottom: '42vh'*/
   },
   innerDiv: {
      width: 'inherit',
      height: 'inherit',
   }
}


export default class Radio extends Component  {
  constructor(props){
    super(props);
  }
  render() {
      return (
         
        <div style={styles.outerDiv}>
           <Slider {...settings}>
            <div><img src="http://localhost:8000/static/images/1.jpg" style={styles.innerDiv} /></div>
            <div><img src="http://localhost:8000/static/images/2.jpg" style={styles.innerDiv} /></div>
            <div><img src="http://localhost:8000/static/images/3.jpg" style={styles.innerDiv} /></div>
            <div><img src="http://localhost:8000/static/images/4.jpg" style={styles.innerDiv} /></div>
            <div><img src="http://localhost:8000/static/images/5.jpg" style={styles.innerDiv} /></div>
            <div><img src="http://localhost:8000/static/images/6.jpg" style={styles.innerDiv} /></div>
          </Slider>
          {/* <MiniPlayer/> */}
        </div>
      );
  }
}
