import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import App from './components/App.jsx'

/**
 * Redux Reducer.
 * @params:
 *  - state: the previous state of the store
 *  - action: an object describing how the state should change
 * @returns:
 *  - state: a new state after apply appropriate changes
 */
const rootReducer = (state = { clicks: 0 }, action) => {
  // ... change state based on action
  return state
}

/**
 * Redux Store object with three functions you should care about:
 *  - getState(): returns the current state of the store
 *  - dispatch(action): calls the reducer with a given action
 *  - subscribe(): called after a reducer runs
 *
 * The store has two optional middlewares to showcase how you would add them:
 *  - redux-thunk: allows `store.dispatch()` to receive a thunk (function) or an object
 *                 See http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559
 *  - redux-logger: logs out redux store changes to the console. Only in dev.
 */
const middlewares = process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : applyMiddleware(thunk, createLogger())
let store = compose(middlewares)(createStore)(rootReducer)

/**
 * Helper function to render the Gradebook component to the DOM.
 * Makes the following props available to the Gradebook component:
 *  - storeState: an object of the latest state of the redux store.
 *  - dispatch: a function that dispatches actions to the store/reducer.
 */
const render = (nodeId, component) => {
  let node = document.getElementById(nodeId)
  ReactDOM.render(<component storeState={store.getState()} dispatch={store.dispatch} />, node)
}

/**
 * Function that bootstraps the app.
 *  - render the component with initial store state.
 *  - re-render the component when the store changes.
 */
const start = () => {
  render('app', App)
  store.subscribe(() => render('app', App))
}
