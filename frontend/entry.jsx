import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// window testing
// import { signup, login, logout } from './util/session_api_util';
import { login, signup, logout } from './actions/session_actions';
import { fetchUser } from './actions/user_actions';
// end

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  const root = document.getElementById("root");

  //window testing functions
  window.aaron = { email: "aaron.zick@gmail.com", password: "password" };
  window.signup = signup;
  window.login = login;
  window.logout = logout;
  window.fetchUser = fetchUser;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  //end 

  ReactDOM.render(<Root store={store} />, root);
});