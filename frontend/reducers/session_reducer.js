import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const _nullSession = {
  id: null
};

export const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    // todo: rename id? current_user_id?
      newState = { id: action.user.id };
      return merge({}, state, newState);
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
};