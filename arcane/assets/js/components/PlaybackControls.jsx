import React, { Component } from 'react'
import {FontIcon, FloatingActionButton, Slider, IconButton} from 'material-ui'
import { redA700 } from 'material-ui/styles/colors'
const styles = {
   smallIcon: {
     width:20,
     height:20,
     fontSize:20,
    //  color: 'rgb(213, 0, 0)'
   },
   mediumIcon: {
     width:40,
     height:40,
     fontSize:40,
    //  color: 'rgb(213, 0, 0)'
   },
   coloredSmallIcon: {
      color: redA700,
     width:20,
     height:20,
     fontSize:20,
   },
   largeIcon: {
     width:60,
     height:60,
     fontSize:60
   },
   small: {
     width: 25,
     height: 25,
     padding:2,
     verticalAlign:'super'
   },
   medium: {
     width:45,
     height:45,
     padding:2,
     verticalAlign:'bottom',

   },
   large: {
     width: 65,
     height: 65,
     padding:4
   },
   hover: {
    color: 'red'
   }
};

export class IconChangeControl extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <IconButton
           iconClassName="material-icons"
           style={styles.medium}
           iconStyle={styles.mediumIcon}
           onClick={this.props.onClick}
           hoveredStyle={styles.hover}>
           {!this.props.flag ? this.props.icon1 : this.props.icon2}
         </IconButton>
      );

   }
}

export class ColoredControl extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <IconButton
           iconClassName="material-icons"
           style={styles.small}
           iconStyle={!this.props.flag ? styles.smallIcon : styles.coloredSmallIcon}
           onClick={this.props.onClick}
           hoveredStyle={styles.hover}>
           {this.props.icon}
         </IconButton>
      );
   }
}

export class DefaultControl extends Component {
   constructor(props){
    super(props);

   }

   render(){
      return(
        <IconButton
          iconClassName="material-icons"
          style={styles.small}
          iconStyle={styles.smallIcon}
          onClick={this.props.onClick}
          hoveredStyle={styles.hover}>
          {this.props.icon}
        </IconButton>
      );
   }
}
