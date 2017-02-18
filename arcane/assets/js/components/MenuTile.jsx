import React, { Component } from 'react'
import {FontIcon, RaisedButton, GridList, GridTile} from 'material-ui'

const url = "http://localhost:8000/";


const iconStyle = {
  margin:0,
  padding:10,
  paddingBottom:5,
  textAlign:'center',
  width:'inherit',
  height:'auto',
  fontSize:45,
  display:'block',
};
const labelStyle= {
  margin:0,
  padding:10,
  paddingTop:0,
  textAlign:'center',
  width:'inherit',
  height:'auto',
  fontSize:13,
  display:'block',
};
const tileStyle = {
  width:'100%',
  height:'auto'
}



export default class MenuTile extends Component {
  constructor(props){
    super(props);
    this.state = {active:false};
  }
  render() {
    return(
      <RaisedButton
        href=""
        target="_blank"
        secondary={true}
        onClick={this.props.onClick}
        icon={<FontIcon
            className="material-icons"
            style={iconStyle}>{this.props.icon}</FontIcon>}
        label={this.props.name}
        labelStyle={labelStyle}
        style={tileStyle}/>
    );
  }
}
