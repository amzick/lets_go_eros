import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';


// window testing
// import { createMessage } from './actions/message_actions';

import { signup, logout} from './util/session_api_util';
import {revealLocation} from './util/ui_util';
import { fetchUser, fetchUsers, updateUser, fetchLocalUsers } from './actions/user_actions';
import { fetchQuestion } from './actions/question_actions';
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
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchUsers = fetchUsers;
  window.fetchUser = fetchUser;
  window.updateUser = updateUser;
  window.revealLocation = revealLocation;
  window.fetchLocalUsers = fetchLocalUsers;
  window.crownLat = 40.6788319;
  window.crownLng = -73.9506774;
  window.manLat = 40.7217861;
  window.manLng = -74.0094471;
  window.logout = logout;
  window.fetchQuestion = fetchQuestion;
  //end 

  ReactDOM.render(<Root store={store} />, root);
});