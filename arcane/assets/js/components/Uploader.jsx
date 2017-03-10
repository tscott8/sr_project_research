import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import {Paper, List, ListItem, Divider, FontIcon, FlatButton} from 'material-ui';
import ExpandTransition from 'material-ui/internal/ExpandTransition';

import * as TrackActions from '../actions/TrackActions';


const styles = {
  paper: {
    margin:10,
    minHeight:'calc(100vh-64px)'
  },
  dropzone: {
    height:'100%',
    width:'100%',
    textAlign:'center',
    text: {
      padding:'10%',
      height:'100%',
      width:'100%',
    }
  },
};
export default class Uploader extends Component  {

  constructor(props){
    super(props);
    this.state = {
      files:[],
      stepIndex: null,
      visited: [],
    }
  }
  componentWillMount() {
   const {stepIndex, visited} = this.state;
   this.setState({visited: visited.concat(stepIndex)});
  }
  componentWillUpdate(nextProps, nextState) {
  const {stepIndex, visited} = nextState;
  if (visited.indexOf(stepIndex) === -1) {
    this.setState({visited: visited.concat(stepIndex)});
    }
  }
  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  onDrop (files) {
     console.log('Received files: ', files);

     for (let i = 0; i < files.length; i++) {
        this.props.addTrack(files[i]);
     }
     this.setState({files: files})

  }

  sendFiles() {
    console.info("Sending files: ", this.state.files);
    const { dispatch } = this.props;
    dispatch(TrackActions.uploadTracks(this.state.files));
    this.setState({files: []});
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
        <FlatButton
          onClick={this.sendFiles.bind(this)}
          label={"Upload"} />
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
  renderDropzone() {
    return (
      <Paper style={styles.paper}>
          <Dropzone
            style={styles.dropzone}
            onDrop={this.onDrop.bind(this)}
            accept="audio/mp3">
            <h3 style={styles.dropzone.text}>Try dropping some files here, or click to select files to upload.</h3>
          </Dropzone>
      <List>
        {this.renderUploaded()}
      </List>
      <iframe src="http://localhost:8000/api/list"></iframe>
     </Paper>
    );
  }
  render() {
      return (this.renderDropzone()
      );
  }
}
