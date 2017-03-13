import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import { Step, Stepper, StepLabel, StepButton } from 'material-ui/Stepper';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import {Paper, List, ListItem, Divider, FontIcon, FlatButton, RaisedButton, Checkbox, CircularProgress, Snackbar} from 'material-ui';
import cookie from 'react-cookie';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import * as TrackActions from '../actions/TrackActions';


const styles = {
  paper: {
    overflowY:'auto',
    maxHeight:'67vh'
  },
  dropzone: {
    height:'100%',
    width:'100%',
    textAlign:'center',
    text: {
      padding:'10%',
      height:'100%',
      width:'100%',
      margin:0
    }
  },
};
export default class Uploader extends Component  {

  constructor(props){
    super(props);
    this.state = {
      stagedFiles: [],
      confirmedFiles: [],
      completed: 0,
      stepIndex: 0,
      snackOpen: false,
      message:'',
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
  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles)
    this.setState({stepIndex: 1, stagedFiles: acceptedFiles});
  };
  handleSelect (rows) {
   this.setState({confirmedFiles:rows})
  }

  handleSnackClose = () => {
    this.setState({
      snackOpen: false,
    });
  }

  uploadTracks(files) {
     let csrftoken = cookie.load('csrftoken');
     let fd = new FormData();
     fd.append('enctype', 'multipart/form-data')
     files.forEach((file) => {
       fd.append('uploadfiles', file, file.name)
     });
     fetch("http://localhost:8000/api/upload/", {
         method: "post",
         headers: {
         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
         "X-CSRFToken": csrftoken
         },
         credentials: "same-origin",
         body:fd,
         })
         .then(response => (response.status, console.log(response)))
         .then(status => (
            this.setState({ stepIndex: 0, snackOpen: true })
         ));
  }

  handleUpload = () => {
    const {stagedFiles, confirmedFiles} = this.state;
    console.log(stagedFiles)
    let uploadFiles = []
    if (confirmedFiles !== 'all') {
      for (var i=0; i < confirmedFiles.length; i++) {
           uploadFiles.push(stagedFiles[confirmedFiles[i]]);
      }
    }
    else {
      uploadFiles = stagedFiles;
    }
    console.info("Sending files: ", uploadFiles);
    // var file = uploadFiles[0];
    // var fileReader = new FileReader();
    // fileReader.readAsArrayBuffer(file);
    const { dispatch } = this.props;
    // dispatch(TrackActions.uploadFiles(uploadFiles));
    this.uploadTracks(uploadFiles);
    this.setState({message: stagedFiles.length + ' file(s) uploaded' , tagedFiles: [], confirmedFiles:[], stepIndex:2});
  }

  getStepContent() {
   switch (this.state.stepIndex) {
     case 0:
       return this.renderDropzone();
     case 1:
       return this.renderStaged();
     case 2:
       return (<div style={{textAlign:'center', padding:50}}><CircularProgress color={'cyan'} size={140} thickness={5} /></div>);
     default:
       return 'You\'re a long way from home sonny jim!';
   }
 }

  renderStaged() {
    const {stagedFiles} = this.state;
    if (stagedFiles) {
    let listItems = stagedFiles.map((file) => (
      <TableRow
        key={'uploaded_'+ stagedFiles.indexOf(file)}>
        <TableRowColumn>{ file.name }</TableRowColumn>
      </TableRow>
      ))
      return (
        <Table multiSelectable={true}  onRowSelection={this.handleSelect.bind(this)}>
          <TableHeader enableSelectAll={true}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            stripedRows={true}>
              {listItems}
          </TableBody>
        </Table>
      );
    }
  }
  renderDropzone() {
    return (
          <Dropzone
            style={styles.dropzone}
            ref={(node) => { this.dropzone = node; }}
            accept="audio/mp3"
            onDrop={this.onDrop}>
            <h3 style={styles.dropzone.text}>Try dropping some files here, or click to select files to upload.</h3>
            {/* <iframe src="http://localhost:8000/api/list"></iframe> */}
          </Dropzone>
    );
  }
  renderActionButtons() {
    const {stepIndex, confirmedFiles} = this.state;
    let action = null;
    if ( stepIndex === 1 && confirmedFiles.length > 0) {
        action = <RaisedButton
          label="Upload"
          // disabled={this.state.stepIndex === 2}
          primary={true}
          onTouchTap={this.handleUpload}
          // onClick={this.sendFiles}
                 />
    }
    else if (stepIndex < 2) {
          action = <RaisedButton
            label="Next"
            // disabled={this.state.stepIndex === 2}
            primary={true}
            onTouchTap={this.handleNext}
          />
    }
    return (
      <div style={{marginTop: 20}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          {action}
      </div>);
  }
  render() {
    const contentStyle = {margin: '0 16px'};
      return (
        <div style={{width: '100%', maxWidth: 700, margin: 'auto', marginTop:10, maxHeight:'calc(100vh-64px)', overflowY:'auto'}}>
          <Stepper linear={true} activeStep={this.state.stepIndex}>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 0})}>
                Choose
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 1})}>
                Confirm
              </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>
              Upload
            </StepButton>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          <Paper style={styles.paper}>{this.getStepContent()}</Paper>
          {this.renderActionButtons()}
        </div>
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackClose}
        />
      </div>
    );
  }
}
