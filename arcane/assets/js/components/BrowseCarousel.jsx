import React, { Component } from 'react'
import Slider from 'react-slick'
import Tile from './Tile'

const url = "http://localhost:8000/";

const responsiveSettings = [
  {
      breakpoint: 560,
      settings: {
         slidesToShow: 3
      }
   },
  {
      breakpoint: 770,
      settings: {
         slidesToShow: 4
      }
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
   slidesToShow: 8,
   slidesToScroll: 3,
   centerMode: false,
   responsive: responsiveSettings
}

const styles = {
   carouselDiv: {
      // maxHeight: '26vh',
      paddingLeft: 35,
      paddingRight:35
          // margin: '5vh',
   },
   outerDiv: {
      display: 'block',
      margin: 'auto',
      width : 'inherit',
      // border: 'solid 3px',
   },
   innerElement: {
      // // height:'calc((100vh-64px)/6)',
      // height:'calc((100vh - 114px)/4)',
      // margin: 'auto',
      // width:'calc((100vh - 114px)/4)',
      // // height:'auto',
      // paddingTop: '10',
      // paddingBottom: '10',
      // paddingLeft: '5',
      // paddingRight: '5'',

         height:'20vh'
      }
}

export default class BrowseCarousel extends Component {
  constructor(props) {
    super(props);
  }
  select = () => {
     console.info("Selected!");
  }
  getProps(type, item) {
    // console.log(type, item)
    let props = {};
    if (type === "album")
      props = {
        imgURL: item.artwork ? item.artwork : url+'static/images/default-artwork.png',
        title:item.name,
        subtitle: item.artist,
        tracks: item.tracks
      };
    if (type === "artist")
      props = {
        imgURL: item.cover_photo ? item.cover_photo : url+'static/images/default-avatar.png',
        title:item.name,
        subtitle: item.genre,
        albums: item.albums
      }
    if (type === "genre")
      props = {
        imgURL: item.icon ? item.icon : url+'static/images/hip_hop.png',
        title:item.name,
        subtitle: null,
        artists: item.artists
      }
    return props;
  }
   renderSliderItems(list) {
     const {type} = this.props;
     let items = list ? list.map((item) => (
       <div
         className="boxTile"
         key={'browse_carousel_item_'+ item.id}
         style={styles.innerElement}
       >
         <Tile
           {...this.props}
           {...this.getProps(type, item)}
           id={item.id}
           type={type}
         />
       </div>
     )) : [<div key={'browse_carousel_item_empty'} />];
        return items;
   }

   render() {
     const {list} = this.props;
     console.log('In BrowseCarousel render', this.props)
     return (
       <div style={styles.carouselDiv}>
         <Slider
           {...settings}
           style={styles.outerDiv}
         >
           {this.renderSliderItems(list.results)}
         </Slider>
       </div>
      );
   }
}
