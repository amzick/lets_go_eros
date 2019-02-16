import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';


// window testing
// import { createMessage } from './actions/message_actions';

import { signup, logout} from './util/session_api_util';
import { fetchUsers, updateUser } from './actions/user_actions';
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
  window.updateUser = updateUser;
  //end 

  ReactDOM.render(<Root store={store} />, root);
});