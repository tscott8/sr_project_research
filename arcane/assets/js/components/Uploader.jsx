import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {Paper} from 'material-ui';

const styles = {
  paper: {
    margin:10,
    padding:10,
    height:'80vh'
  },
  dropzone: {
    color: 'cyan',
    textAlign:'center',
    padding:200
  },
  text: {
    height:'100%',

  }
};
export default class Uploader extends Component  {

  constructor(props){
    super(props);
  }
  onDrop(files) {
    console.log('Received files: ', files);

  }
  render() {
      return (
        <Paper style={styles.paper}>
            <Dropzone style={styles.dropzone} onDrop={this.onDrop.bind(this)}>
              <h3 style={styles.text}>Try dropping some files here, or click to select files to upload.</h3>
            </Dropzone>
       </Paper>
      );
  }
}
