import React, { Component } from 'react'
import {} from 'material-ui'
import {Slider} from 'react-slick'
import MiniPlayer from './MiniPlayer2'

export default class Radio extends Component  {
  constructor(props){
    super(props);
  }
  render() {
      return (
        <div>
          <MiniPlayer/>
          {/* <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}>
              <div><h3>1</h3></div>
              <div><h3>2</h3></div>
              <div><h3>3</h3></div>
              <div><h3>4</h3></div>
              <div><h3>5</h3></div>
              <div><h3>6</h3></div>
          </Slider> */}
        </div>
      );
  }
}
