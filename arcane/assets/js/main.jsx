import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import injectTapEventPlugin from "react-tap-event-plugin";

import App from './containers/App';
import configureStore from './store/configureStore';

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import RoutesContainer from './routes/routes'

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
      <Router history={history}>
         <RoutesContainer />
      </Router>
    </Provider>,
    document.getElementById("app")
);
