import React, { Component } from 'react'
import { Link } from 'react-router'
import { RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { redA700, fullWhite } from 'material-ui/styles/colors'
import theme from '../constants/material-ui-theme'
import MediaQuery from 'react-responsive'

const host = "http://localhost:8000/"

const styles = {
   img: {
      position: 'absolute',
      width: '100%',
      height: '100%'
   },
   button: {
      width: '100%',
      textAlign: 'center',
      position: 'absolute',
      bottom: '0px',
      marginBottom: '3vh'
   },
   name: {
      position: 'absolute',
      fontFamily: 'Aldrich',
      color: fullWhite,
      marginLeft: '5vw',
      marginTop: '5vw'
   }
}

export default class SplashPage extends Component {
   constructor(props) {
      super(props);
   }

   renderPhone() {
      return (
         <div>
            <img style={styles.img} src={host + 'static/images/audience-phone.jpg'} />
            <h1 style={styles.name}>ARCANE</h1>
            <Link to={"/app/"} style={styles.button} >
               <RaisedButton label="Let Go!" primary={true}  />
            </Link>
         </div>
      );
   }

   renderDesktop() {
      return (
         <div>
            <img style={styles.img} src={host + "static/images/audience-desktop.jpg" } />
            <h1 style={styles.name}>ARCANE</h1>
            <Link to={"/app/"} style={styles.button} >
               <RaisedButton label="Let Go!" primary={true}  />
            </Link>
         </div>
      );
   }

   render() {
      //console.info(this.props.children);
      if (this.props.children) {
         return (
            <div>
               {this.props.children}
            </div>
         );
      } else {
         return (
            <MuiThemeProvider muiTheme={theme} >
               <div>
                  <MediaQuery query='(min-device-width: 560px)'>
                     <MediaQuery query='(max-width: 59px)'>
                        {this.renderPhone()}
                     </MediaQuery>
                     <MediaQuery query='(min-width: 560px)'>
                        {this.renderDesktop()}
                     </MediaQuery>
                  </MediaQuery>
                  <MediaQuery query='(max-device-width: 559px)'>
                     {this.renderPhone()}
                  </MediaQuery>
               </div>
            </MuiThemeProvider>
         );
      }

   }
}
