import React, { Component } from 'react'
import {} from 'material-ui'
import Slider from 'react-slick'
import MiniPlayer from './MiniPlayer2'

const settings = {
   dots: true,
   infinite: true,
   arrows: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   centerMode: true,
   fade: true
}

const styles = {
   outerDiv: {
      maxWidth: '500px',
      maxHeight: '25vh',
      marginLeft: '30vw',
      marginBottom: '42vh'
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
        <div >
          <MiniPlayer/>
          {/* <Slider {...settings}>
            <div><img src="http://localhost:8000/static/images/1.jpg" style={styles.innerDiv} /></div>
            <div><img src="http://localhost:8000/static/images/2.jpg" style={styles.innerDiv} /></div>
            <div><img src="http://localhost:8000/static/images/3.jpg" style={styles.innerDiv} /></div>
            <div><img src="http://localhost:8000/static/images/4.jpg" style={styles.innerDiv} /></div>
            <div><img src="http://localhost:8000/static/images/5.jpg" style={styles.innerDiv} /></div>
            <div><img src="http://localhost:8000/static/images/6.jpg" style={styles.innerDiv} /></div>
          </Slider> */}
        </div>
      );
  }
}
