import React from 'react';
import ReactDOM from 'react-dom';

// IMPORT COMPONENTS
import Welcome from './welcome';
import Login from './login';
import Register from './register';
import App from './app';
import Boards from './boards';

// IMPORT REDUX & REDUX MIDDLEWARE
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// IMPORT HASH ROUTER. WE WILL USE THIS TO ROUTE USERS NOT LOGGED IN
import { Router, Route, IndexRoute, hashHistory, browserHistory, Redirect } from 'react-router';

// CREATE REDUX STORE AND APPLY REDUX PROMISE MIDDLEWARE
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));


let router;

let elem = (
  <Provider store = { store } >
    <App />
  </Provider>
)


 if (location.pathname == "/welcome/") {
   router = <Welcome />
 } else {
   router = elem;
 }







ReactDOM.render(
    router,
    document.querySelector('main')
);
