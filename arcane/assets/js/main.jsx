import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import injectTapEventPlugin from "react-tap-event-plugin";

import App from './components/App';
import configureStore from './store/configureStore';

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);
