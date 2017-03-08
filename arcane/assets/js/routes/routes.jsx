import React, {Component} from 'react'
import { Route, DefaultRoute, IndexRoute } from 'react-router'

import App from '../containers/App'
import Upload from '../containers/UploadPage'
import Radio from '../containers/RadioPage'
import LandingPage from '../containers/LandingPage'
import MyMusic from '../containers/MyMusicPage'
import Browse from '../containers/BrowsePage'
import About from '../containers/AboutPage'
import SplashPage from '../containers/SplashPage'
import Settings from '../containers/SettingsPage'

export default (
   <Route path="/" component={SplashPage}>
      <Route path="/app/" component={App} >
         <IndexRoute component={LandingPage} />
         <Route path="upload" component={Upload} />
         <Route path="radio" component={Radio} />
         <Route path="my_music" component={MyMusic} />
         <Route path="browse" component={Browse} />
         <Route path="about" component={About} />
         <Route path="settings" component={Settings} />
         <Route path="*" component={SplashPage} />
      </Route>
      <Route path="*" component={SplashPage} />
   </Route>
);
