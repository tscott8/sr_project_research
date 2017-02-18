import React, { Component } from 'react'
import {FontIcon, RaisedButton, GridList, GridTile} from 'material-ui'
import MiniPlayer from './ArcaneMiniPlayer'
const tilesData = [
  {
    img: 'http://localhost:8000/static/images/1.jpg',
    title: 'Breakfast',
    author: 'jill111',
    featured: true,
  },
  {
    img: 'http://localhost:8000/static/images/2.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'http://localhost:8000/static/images/3.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'http://localhost:8000/static/images/4.jpg',
    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
  },
  {
    img: 'http://localhost:8000/static/images/5.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'http://localhost:8000/static/images/6.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'http://localhost:8000/static/images/7.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'http://localhost:8000/static/images/8.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

export default class Test extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
  <div style={styles.root}>
    <GridList
      cols={2}
      cellHeight={200}
      padding={1}
      style={styles.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          actionIcon="WEE"
          actionPosition="left"
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 1}
          rows={tile.featured ? 2 : 1}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);
}
}
