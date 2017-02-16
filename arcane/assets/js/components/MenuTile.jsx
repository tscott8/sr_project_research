import React, { Component } from 'react'
import { Drawer, AppBar, MenuItem, FontIcon, RaisedButton,GridTile} from 'material-ui'

const iconStyle = {
  margin:'0',
  padding:'0',
  textAlign:'center',
  width:'inherit',
  height:'70%',
  fontSize:'50px',
  display:'block',
  paddingTop:'15%'
};
const labelStyle= {
  margin:'0',
  padding:'0',
  textAlign:'center',
  width:'inherit',
  height:'auto',
  fontSize:'15px',
  display:'block',
  paddingTop:'10%',
  paddingBottom:'15%'
  };
const tileStyle = {
  minWidth:'47%',
  height:'auto',
  lineHeight:'100%',
  verticalAlign:'middle'};
const tileStyle2 = {
  width:'100%',
  height:'auto'
}
const gridTStyle = {
  height:'auto'
}

export default class MenuTile extends Component {
  constructor(props){
    super(props);
    this.state = {active:false};
  }

  renderButton() {
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
        style={tileStyle2}/>
    );
  }

  render() {
    return (
      <GridTile>{this.renderButton()}</GridTile>

    );
  }
}
