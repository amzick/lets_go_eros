import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// window testing
// import { signup, login, logout } from './util/session_api_util';
// end

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();
  const root = document.getElementById("root");

  //window testing functions
  // window.aaron = {email:"aaron.zick@gmail.com",password:"password"};
  // window.signup = signup;
  // window.login = login;
  // window.logout = logout;
  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  //end

  ReactDOM.render(<Root store={store} />, root);
});