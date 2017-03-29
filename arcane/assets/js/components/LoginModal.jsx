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
export default class LoginModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username: "",
        username_errors:[],
        password:"",
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
  checkUsername = (e) => {
    console.log('checking user exists...')
    let u = e.target.value;
    if (u.length < 1) { this.setState({username_errors:['required field']}) }
    else if (u.length > 0 && !this.checkSpecialChars(u)) { // and check if not in db
      this.setState({username:u, username_errors:['invalid username']})
    } else { this.setState({username:u, username_errors:[]}) }
  }
  verifyPassword = (e) => {
    console.log('verifying password with username...')
    let p = e.target.value;
    if (p.length < 1) { this.setState({password_errors:['required field']}) }
    else if (p.length > 0 && (!this.checkLength(p, 8) || !this.checkSpecialChars(p))) { // and check if not in db
      this.setState({password:p, password_errors:['invalid password']})
    } else { this.setState({password:p, password_errors:[]}) }
  }
  handleLogin = () => {
    this.props.onRequestClose();
    alert('dispatch login(' + this.state.username + ', ' + this.state.password + ')');
  }
  handleJoin = () => { alert('open sign up form!') }

  formHasErrors () {
    const {username_errors, password_errors} = this.state;
    if (username_errors.length > 0 || password_errors.length > 0) { return true; }
    else { return false; }
  }
  formIsEmpty () {
    const {username, password} = this.state;
    if (username.length < 1 || password.length < 1) { return true; }
    else { return false; }
  }
  getActions () {
    return [
      <FlatButton
        id={'login_form_join'}
        key={'login_form_join'}
        label="Join Us"
        onTouchTap={this.handleJoin}
      />,
      <FlatButton
        containerElement={this.renderLink()}
        disabled={this.formHasErrors()}
        id={'login_form_submit'}
        key={'login_form_submit'}
        label={"Login"}
        onTouchTap={this.handleLogin}
        secondary
      />
  ];
  }
  renderLink () {
    if (!this.formHasErrors() && !this.formIsEmpty())
      return <Link to={"/app/"} />
  }
  render() {
    const {username_errors, password_errors}=this.state;
    return(
      <Dialog
        {...this.props}
        actions={this.getActions()}
        actionsContainerStyle={styles.formActions}
        autoDetectWindowHeight
        autoScrollBodyContent
        id={"login_form_container"}
        modal
        title={null}
      >
        <TextField
          errorText={username_errors.length > 0 ? username_errors.join(', '): null}
          floatingLabelText={'Username'}
          fullWidth
          id={'login_form_username'}
          name={'login_form_username'}
          onChange={this.checkUsername}
          type={'email'}
          // value={this.state.username}
        />
        <TextField
          errorText={password_errors.length >0 ? password_errors.join(', '): null}
          floatingLabelText={'Password'}
          fullWidth
          id={'login_form_password'}
          name={'login_form_password'}
          onChange={this.verifyPassword}
          type={'password'}
        />
      </Dialog>
    );
  }
}
