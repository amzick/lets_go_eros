import { RECEIVE_UI_ERRORS } from '../actions/ui_actions';
import { RECEIVE_CURRENT_USER, CLEAR_ERRORS } from '../actions/session_actions';
import { merge } from 'lodash';

export const errorsUiReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_UI_ERRORS:
      newState = action.errors;
      return merge([], oldState, newState);
    case RECEIVE_CURRENT_USER, CLEAR_ERRORS:
      return [];
    default:
      return oldState;
  };
};