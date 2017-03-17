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
      height: '26vh',
      paddingLeft: 35,
      paddingRight:35
   },
   outerDiv: {
      display: 'block',
      margin: 'auto',
      width : 'inherit',
      border: 'solid 3px',
      minHeight:'26vh'
   },
   innerElement: {
    //  height:'auto',
      minHeight:180,
      height:'calc(95vw/8)',
      // margin: 'auto',
      // paddingTop: '0',
      // paddingBottom: '0',
      paddingLeft: 4,
      paddingRight: 4
      // padding:3
   }
}

export default class AlbumCarousel extends Component {
  constructor(props) {
    super(props);
  }

  select = () => {
     console.info("Selected!");
  }
   renderSliderItems(albums) {
      let items = albums ? albums.map((item) => (
        <div
          key={'album_carousel_item_'+ item.id}
          style={styles.innerElement}
        >
          <Tile
            {...this.props}
            // dispatch={this.props.dispatch}
            id={item.id}
            imgURL={item.artwork ? item.artwork : url+'static/images/default-artwork.png'}
            // select={this.props.select}
            // selectedTracks={this.props.selectedTracks}
            subtitle={item.artist}
            title={item.name}
            tracks={item.tracks}
          />
        </div>)) : [<div key={'album_carousel_item_empty'} />];
        return items;

   }

   render() {
     const {albums} = this.props;
     console.log('Album Carousel : ', albums)
     return (
       <div style={styles.carouselDiv}>
         <Slider
           {...settings}
           style={styles.outerDiv}
         >
           {this.renderSliderItems(albums.allAlbums.results)}
         </Slider>
       </div>
      );
   }
}
