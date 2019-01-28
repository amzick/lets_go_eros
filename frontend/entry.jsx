import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';


// window testing
// import { signup, login, logout } from './util/session_api_util';
import { revealLocation } from './util/ui_util';
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

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.revealLocation = revealLocation;
  //end 

  ReactDOM.render(<Root store={store} />, root);
});