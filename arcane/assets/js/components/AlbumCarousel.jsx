import React, { Component } from 'react'
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
   },
   innerElement: {
      width: 'inherit',
      height: 'inherit',
   }
}

export default class AlbumCarousel extends Component {
   renderSliderItems() {
      let items = [];
      console.info(typeof(this.props.list));
      if (typeof(this.props.list) === undefined) {
         for (let i = 0; i < this.props.list.length; i++) {
            let item = this.props.list[i];
            items.push(<div><img key={"carousel_item_" + i} src={item.coverArt} style={styles.innerElement}/></div>)
         }
      }
      return items;
   }

   render() {
      return (
         <div style={styles.outerDiv}>
            <Slider {...settings}>
               {this.renderSliderItems()}
            </Slider>
         </div>
      );
   }
}
