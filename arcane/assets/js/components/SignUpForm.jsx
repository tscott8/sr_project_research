import React , {Component} from 'react';
import {TextField, FlatButton, Dialog} from 'material-ui'
import theme from '../constants/material-ui-theme'
import { Link } from 'react-router'

const styles = {
  formContainer:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'},
  formFields:{
    width:'100%'
  },
  underlineStyle:{
    borderColor:theme.palette.textColor
  },
  formActions:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    borderColor:'transparent',
    paddingBottom:24
  },
  button:{}
}
export default class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        first_name:null,
        first_name_errors:[],
        last_name:null,
        last_name_errors:[],
        birth_date:null, //for verifying age.
        email: null,
        email_errors:[],
        password:null,
        password_errors:[]
      };
  }
  checkSpecialChars = (string) => {
    let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    let test = format.test(string)
    console.log(test)
    return !test
  }
  checkLength = (string, length) => {
    let test = string.length >= length ? true : false;
    console.log('length', test)
    return test
  }
  checkField = (e) => {
    let item = e.target.value;
    let key = e.target.id;
    let errKey = e.target.id+'_errors'
    if (item.length < 1) { this.setState({[errKey]:['required field']})}
    else if (item.length > 0 && !this.checkSpecialChars(item)) {
      if(key !== "email" && key !== "birth_date") {
        this.setState({[key]:item, [errKey]:['invalid '+key]}) } }
    else { this.setState({[key]:item, [errKey]:[]}) }
  }

  verifyPassword = (e) => {
    let p = e.target.value;
    if (p.length < 1) { this.setState({password_errors:['required field']}) }
    else if (p.length > 0 && (!this.checkLength(p, 8) || !this.checkSpecialChars(p))) { // and check if not in db
      this.setState({password:p, password_errors:['invalid password']})
    } else { this.setState({password:p, password_errors:[]}) }
  }
  confirmPassword = (e) => {
    let item = e.target.value;
    console.log(item, this.state.password)
    if(item !== this.state.password) {
      this.setState({password_errors: ['passwords do not match']})
    }
  }
  handleJoin= () => {
    this.props.onRequestClose();
    alert('dispatch createUser(' + this.state + ')');
  }
  formHasErrors () {
    const {email_errors, password_errors, first_name_errors, last_name_errors} = this.state;
    if (email_errors.length > 0 || password_errors.length > 0 || first_name_errors.length > 0 || last_name_errors.length > 0) { return true; }
    else { return false; }
  }
  formIsEmpty () {
    const {first_name, last_name, email, password, birth_date} = this.state;
    if (!(email && password && first_name && last_name && birth_date)) { return true; }
    else { return false; }
  }
  getActions () {
    return [
      <FlatButton
        id={'join_form_cancel'}
        key={'join_form_cancel'}
        label="Cancel"
        onTouchTap={this.props.onRequestClose}
      />,
      <FlatButton
        containerElement={this.renderLink()}
        disabled={this.formHasErrors() || this.formIsEmpty()}
        id={'join_form_submit'}
        key={'join_form_submit'}
        label={"Join Arcane"}
        onTouchTap={this.handleJoin}
        secondary
      />
  ];
  }
  renderLink () {
    if (!this.formHasErrors() && !this.formIsEmpty())
      return <Link to={"/app/"} />
  }
  render() {
    const {email_errors, password_errors, first_name_errors, last_name_errors}=this.state;
    return(
        <Dialog
          {...this.props}
          actions={this.getActions()}
          actionsContainerStyle={styles.formActions}
          autoDetectWindowHeight
          autoScrollBodyContent
          id={"join_form_container"}
          title={null}
        >
          <TextField
            errorText={first_name_errors.length > 0 ? first_name_errors.join(', '): null}
            floatingLabelText={'First Name'}
            fullWidth
            hintText={'Johnny'}
            id={'first_name'}
            name={'first_name'}
            onChange={this.checkField}
            type={'text'}
          />
          <TextField
            errorText={last_name_errors.length >0 ? last_name_errors.join(', '): null}
            floatingLabelText={'Last Name'}
            fullWidth
            hintText={'Lingo'}
            id={'last_name'}
            name={'last_name'}
            onChange={this.checkField}
            type={'text'}
          />
          <TextField
            floatingLabelText={'Birth Date'}
            fullWidth
            hintText={'10/30/1991'}
            id={'birth_date'}
            name={'birth_date'}
            onChange={this.checkField}
            type={'text'}
          />
          <TextField
            errorText={email_errors.length > 0 ? email_errors.join(', '): null}
            floatingLabelText={'Email (this will be your username)'}
            fullWidth
            hintText={'user.name@arcane.fm'}
            id={'email'}
            name={'email'}
            onChange={this.checkField}
            type={'email'}
            // value={this.state.username}
          />
          <TextField
            errorText={password_errors.length >0 ? password_errors.join(', '): null}
            floatingLabelText={'Password (must be at least 8 characters)'}
            fullWidth
            id={'password'}
            name={'password'}
            onChange={this.verifyPassword}
            type={'password'}
          />
          <TextField
            errorText={password_errors.length >0 ? password_errors.join(', '): null}
            floatingLabelText={'Confirm Password (re-type your password)'}
            fullWidth
            id={'confirm_pass'}
            name={'confirm_pass'}
            onChange={this.confirmPassword}
            type={'password'}
          />

      </Dialog>
    );
  }
}
