import React, { Component } from 'react'
import Slider from 'react-slick'
import MiniPlayer from './MiniPlayer2'

const responsiveSettings = [
   {
      breakpoint: 560,
      settings: {
         slidesToShow: 3
      },
   },
   {
      breakpoint: 770,
      settings: {
         slidesToShow: 4
      },
   },
   {
      breakpoint: 1060,
      settings: {
         slidesToShow: 6
      }
   }
]

const settings = {
   dots: false,
   infinite: true,
   arrows: true,
   slidesToShow: 7,
   slidesToScroll: 1,
   centerMode: false,
   responsive: responsiveSettings
}

const styles = {
   carouselDiv: {
      height: '26vh',
      margin: '5vh',
   },
   outerDiv: {
      display: 'block',
      margin: 'auto',
      width : 'inherit',
      border: 'solid 3px'
   },
   innerElement: {
      margin: 'auto',
      width: 'inherit',
      paddingTop: '10',
      paddingBottom: '10',
      paddingLeft: '5',
      paddingRight: '5'
   }
}

export default class AlbumCarousel extends Component {
   renderSliderItems() {
      let items = [];
      console.info(Object.keys(this.props.list));
      if (Object.keys(this.props.list).length > 0) {
         for (let key in this.props.list) {
            let item = this.props.list[key];
            items.push(<div key={"album_carousel_item_" + item.id}><img src={item.artwork} style={styles.innerElement}/></div>)
         }
      } else {
         items.push(<div><img src="http://localhost:8000/static/images/default-artwork.png" /></div>);
      }
      console.info(items);
      return items;
   }

   render() {
      return (
         <div style={styles.carouselDiv}>
            <Slider {...settings} style={styles.outerDiv}>
               {this.renderSliderItems()}
            </Slider>
         </div>
      );
   }
}
