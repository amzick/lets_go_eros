import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';


// window testing
// import { createMessage } from './actions/message_actions';
import { createHeart, deleteHeart } from './actions/heart_actions';

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
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.createHeart = createHeart;
  window.deleteHeart = deleteHeart;
  //end 

  ReactDOM.render(<Root store={store} />, root);
});