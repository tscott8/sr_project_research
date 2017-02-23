import React, {Component} from 'react'
import {Route, DefaultRoute, IndexRoute} from 'react-router'

import App from '../containers/App'
import Uploader from '../components/Uploader'
import Radio from '../containers/RadioPage'
import LandingPage from '../containers/LandingPage'
import MyMusic from '../containers/MyMusicPage'

export default (
   <Route path="/app/" component={App} >
      <IndexRoute component={LandingPage} />
      <Route path="upload" component={Uploader} />
      <Route path="radio" component={Radio} />
      <Route path="my_music" component={MyMusic} />
      <Route path="*" component={LandingPage} />
   </Route>
);
