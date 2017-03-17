import React, { Component } from 'react'
import { List, ListItem, Avatar, Paper, TextField, SelectField, MenuItem} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { redA700, fullWhite } from 'material-ui/styles/colors'
import theme from '../constants/material-ui-theme'
import MediaQuery from 'react-responsive'
import Toggle from 'material-ui/Toggle';

const styles = {
  profileSection: {
    padding:10,
    avatarSection:{
        maxWidth:'33%',
        float:'left',
        padding:10,
    },
    inputSection: {
      width:'66%',
      float:'right'
    }
  },
  appSection: {
    padding:10
  },
  paper: {
    overflowY:'auto',
    minHeight:'60vh',
    backgroundColor:theme.palette.primary3Color
  },
};

const profileSettings = [
  {'key': 'realname','label':'Name', 'type':'text', 'defaultValue': 'Tyler Scott', 'onChange':''},
  {'key': 'username','label':'Email', 'type':'email', 'defaultValue': 'tscott8@arcane.fm', 'onChange':''},
  {'key': 'password','label':'Password', 'type':'password', 'defaultValue': 'password123', 'onChange':''},
  {'key': 'location','label':'Region', 'type':'select', 'defaultValue': 'US', 'options':['US', 'CAN', 'CHI', 'JAP', 'RUS', 'ENG', 'FRA', 'MEX'],'onChange':''},
  {'key': 'privacy_level','label':'Privay Level', 'type':'select', 'defaultValue': '0 - Everyone', 'options':['0 - Everyone', '1 - Followers', '2 - Freinds Only', '3 - Antisocial'],'onChange':''},

];
const appSettings = [
  {'key': 'theme', 'label':'Theme', 'type':'select', 'defaultValue': 'ARCANE DARK', 'options':['ARCANE DARK','ARCANE LIGHT', 'PANDORA', 'SPOTIFY', 'GOOGLE PLAY', 'CUSTOM'],'onChange':''},
  {'key': 'player_pos', 'label':'Player Position', 'type':'select', 'defaultValue': 'RIGHT DRAWER', 'options': ['RIGHT DRAWER','LEFT DRAWER', 'HEADER', 'FOOTER'], 'onChange':''},
  {'key': 'explicit', 'label':'Allow Explicit Content', 'type':'toggle', 'defaultValue': false, 'onChange':''},
  {'key': 'push_notifications', 'label':'Enable Push Notifications', 'type':'toggle', 'defaultValue': false, 'onChange':''},
  ];


export default class Settings extends Component {
   constructor(props) {
      super(props);
      this.state = {
        explicit: false
      }
   }
   onChange = (e) => {
     console.log(e)
     this.setState({[e.target.id]:e.target.value})}

   renderTextField(item) {
     return (
       <TextField
         id={item.key}
         name={item.key}
         type={item.type}
         fullWidth={true}
         defaultValue={item.defaultValue}
         floatingLabelText={item.label}
         onChange={this.onChange}
       />
     );
   }
   renderSelectField(item) {
     let options = item.options.map((option) => (
       <MenuItem value={option} primaryText={option}/>
     ))
     return (
       <SelectField
         id={item.key}
         name={item.key}
         type={item.type}
         fullWidth={true}
         value={item.defaultValue}
         floatingLabelText={item.label}
         onChange={this.onChange}
       >
         {options}
       </SelectField>
     );
   }
   renderSettingInput(setting, section) {
     if((setting.type === 'text')|| (setting.type === 'email') || (setting.type === 'password')) {
        return (
          <div key={section+'_settings_'+setting.key}
            // disabled={true}
          >
            {this.renderTextField(setting)}
          </div>
        );
      }
     if(setting.type === 'select') {
        return (
          <div key={section+'_settings_'+setting.key}
            // disabled={true}
          >
            {this.renderSelectField(setting)}
          </div>
        );
      }
      if(setting.type === 'toggle') {
        const {[&setting.key]} = this.state
         return (
           <div key={section+'_settings_'+setting.key}>
             <Toggle labelPosition="left"
               label={setting.label.toUpperCase()} id={setting.key} toggled={[&setting.key]} onToggle={this.onChange}/>
           </div>
         );
       }

   }
   renderSettings(collection, section) {
     let map = collection.map((setting) => (
          this.renderSettingInput(setting, section)
    ))
    return map;
   }
   render() {
     return(
       <div style={{width: '100%', maxWidth: '75vw', margin: 'auto', marginTop:10, maxHeight:'calc(100vh-64px)', overflowY:'auto'}}>
         <Paper style={styles.paper}>
           <div style={styles.profileSection}>
             <div style={styles.profileSection.avatarSection}>
               <img style={{borderRadius:'50%',  width: '100%', height: 'auto'}} src={"https://scontent.xx.fbcdn.net/v/t31.0-1/13418663_10206730877055291_8028342317280224995_o.jpg?oh=2012ec2865e169040bcb3f15f2c31387&oe=59308486"}/>
             </div>
             <div style={styles.profileSection.inputSection}>
               {this.renderSettings(profileSettings,'profile')}
             </div>

           </div>
           <div style={styles.appSection}>
             {this.renderSettings(appSettings, 'app')}
           </div>
         </Paper>
       </div>
         );
         }
         }
