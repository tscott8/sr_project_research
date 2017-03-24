import React , {Component} from 'react';
import {TextField, Paper, RaisedButton, FlatButton} from 'material-ui'
import theme from '../constants/material-ui-theme'

const formItems = [  {'key': 'username','label':'username', 'type':'email', 'defaultValue': 'tscott8@arcane.fm',},
  {'key': 'password','label':'Password', 'type':'password', 'defaultValue': 'password123', 'onChange':''},]

const styles = {
  formContainer:{
    maxWidth:'60vw',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center'},
  formFields:{padding:20, width:'100%'},
  underlineStyle:{borderColor:theme.palette.textColor},
  formActions:{
    display:'flex',
    flexDirection:'row-reverse',
    justifyContent:'flex-start',
    marginTop:14},
  button:{},
}
export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username: "",
        username_errors:[],
        password:"",
        password_errors:[],
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
    if (u.length < 1) {
      this.setState({username_errors:['required field']})
    }
    else if (u.length > 0 && !this.checkSpecialChars(u)) {
      // and check if not in db
      this.setState({username:u, username_errors:['invalid username']})
    }
    else {
      this.setState({username:u, username_errors:[]})
    }
  }
  verifyPassword = (e) => {
    console.log('verifying password with username...')
    let p = e.target.value;
    if (p.length < 1) {
      this.setState({password_errors:['required field']})
    }
    else if (p.length > 0 && (!this.checkLength(p, 8) || !this.checkSpecialChars(p))) {
      // and check if not in db
      this.setState({password:p, password_errors:['invalid password']})
    }
    else {
      this.setState({password:p, password_errors:[]})
    }
  }
  handleLogin = () => {
    if (this.state.valid)
      alert('dispatch login(', this.state.username, ', ', this.state.password, ')')
    else
      alert('username and/or password are invalid')
  }

  render() {
    const {username_errors, password_errors}=this.state;
    return(
      <div id={"login_form_container"} style={styles.formContainer}
      >
        <div id={'login_form_fields'} style={styles.formFields}>
          <TextField
            id={'login_form_username'}
            name={'login_form_username'}
            type={'email'}
            errorText={username_errors.length>0 ? username_errors.join(', '): null}
            fullWidth={true}
            floatingLabelText={'Username'}
            onChange={this.checkUsername}
          />
          <TextField
            id={'login_form_password'}
            name={'login_form_password'}
            type={'password'}
            errorText={password_errors.length>0 ? password_errors.join(', '): null}
            fullWidth={true}
            floatingLabelText={'Password'}
            onChange={this.verifyPassword}
          />
        </div>
        <div id={'login_form_actions'} style={styles.formActions}>
          <FlatButton
            id={'login_form_submit'}
            label="Login"
            secondary
            disabled={username_errors.length > 0 || password_errors.length > 0}
            onTouchTap={this.handleLogin}
          />
        </div>

      </div>
    );
  }
}
