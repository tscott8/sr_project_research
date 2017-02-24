import React, {Component} from 'react'
import {Route, DefaultRoute, IndexRoute} from 'react-router'

import App from '../containers/App'
import Upload from '../containers/UploadPage'
import Radio from '../containers/RadioPage'
import LandingPage from '../containers/LandingPage'
import MyMusic from '../containers/MyMusicPage'
import Browse from '../containers/BrowsePage'


export default (
   <Route path="/app/" component={App} >
      <IndexRoute component={LandingPage} />
      <Route path="upload" component={Upload} />
      <Route path="radio" component={Radio} />
      <Route path="my_music" component={MyMusic} />
      <Route path="browse" component={Browse} />
      {/* <Route path="*" component={LandingPage} /> */}
   </Route>
);
