import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {Paper, List, ListItem, Divider, FontIcon} from 'material-ui';

const styles = {
  paper: {
    margin:10,
    minHeight:'calc(100vh-64px)'
  },
  dropzone: {
    height:'100%',
    width:'100%',
    textAlign:'center',
    },
  text: {
    padding:'10%',
    height:'100%',
    width:'100%'
    // margin:'10%',
    // marginTop:'20%',
    // marginBottom:'20%',



  }
};
export default class Uploader extends Component  {

  constructor(props){
    super(props);
    this.state = {
      files:[]
    }
  }
  onDrop(files) {
     console.log('Received files: ', files);
     for (let i = 0; i < files.length; i++) {
        this.props.addTrack(files[i]);
     }
     this.setState({files: files})
  }
  renderUploaded() {
    const {files} = this.state;
    if (files) {
    let listItems = files.map((file) => (
      <div>
        <Divider/>
        <ListItem
          key={'uploaded_'}
          primaryText={file.name}
          leftCheckbox={this.renderCheck()}/>
      </div>
      ))
      return listItems;
    }
  }
  renderCheck() {
    return(
      <FontIcon className={'material-icons'}>check</FontIcon>
    );
  }
  render() {
      return (
        <Paper style={styles.paper}>
            <Dropzone style={styles.dropzone} onDrop={this.onDrop.bind(this)} accept="audio/mp3">
              <h3 style={styles.text}>Try dropping some files here, or click to select files to upload.</h3>
            </Dropzone>
        <List>
          {this.renderUploaded()}
        </List>
       </Paper>
      );
  }
}
