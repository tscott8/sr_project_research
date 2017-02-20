import React, { Component } from 'react'
import {FontIcon, RaisedButton, GridList, GridTile} from 'material-ui'

const styles = {
  root:{
    width:'100%',
    height:'auto',
    textAlign:'center'
  },
  guts: {
    root:{
      minWidth:'6rem',
      minHeight:'6rem',
      width:'100%',
      height:'auto',
      justifyContent:'space-between',
      padding:10,
    },
    icon: {
      width:'100%',
      fontSize:'6rem',
      verticalAlign:'bottom',
      display:'block'
    },
    label: {
      marginTop:'.5rem',
      width:'100%',
      fontSize:'2rem',
      verticalAlign:'bottom',
      display:'block'
    }
  }
};

export default class SquareButton extends Component {
  constructor(props){
    super(props);
    this.state = {active:false};
  }

  renderButtonGuts(){
    return(
      <div style={styles.guts.root}>
        <FontIcon className="material-icons" style={styles.guts.icon}>{this.props.icon}</FontIcon>
        <span style={styles.guts.label}>{this.props.name}</span>
      </div>
    );
  }
  render() {
    return (
      <RaisedButton
        href=""
        target="_blank"
        secondary={true}
        onClick={this.props.onClick}
        style={styles.root}>
          {this.renderButtonGuts()}
        </RaisedButton>

    );
  }
}
