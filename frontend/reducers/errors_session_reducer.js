import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { merge } from 'lodash';



export const errorsSessionReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      newState = action.errors;
      return merge([], oldState, newState);
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return oldState;
  };
};