import {RECEIVE_MESSAGES, RECEIVE_MESSAGE } from '../actions/message_actions';
import {merge} from 'lodash';


const messagesReducer = (state = {}, action) => {
  Object.freeze(state); 
  let newState;
  switch (action.type) {
    case RECEIVE_MESSAGES:
      newState = merge({}, state);
      return merge(newState, action.messages);
    case RECEIVE_MESSAGE:
      newState = merge({}, state);
      return merge(newState, action.messages);
     default:
      return state;
  }
};

export default messagesReducer;