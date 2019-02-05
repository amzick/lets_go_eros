import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';


// window testing
// import { signup, login, logout } from './util/session_api_util';
// import { revealLocation } from './util/ui_util';
// import * as UserApiUtil from './util/user_api_util';
// import { fetchGenders, fetchEthnicities, fetchUsers, fetchUser } from './actions/user_actions';
import { fetchMessagesBetween } from './util/message_api_util';

import { signup, logout} from './util/session_api_util';
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
  // window.UserApiUtil = UserApiUtil;
  window.signup = signup;
  // window.fetchUsers = fetchUsers;
  // window.fetchUser = fetchUser;
  window.logout= logout;
  window.fetchMessagesBetween = fetchMessagesBetween;
  //end 

  ReactDOM.render(<Root store={store} />, root);
});