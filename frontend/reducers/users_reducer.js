import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER, RECEIVE_USERS, RECEIVE_GENDERS, RECEIVE_ETHNICITIES } from '../actions/user_actions';
import { merge } from 'lodash';


export const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_USERS:
      return merge({}, action.users);
    default:
      return state;
  }
};

export const gendersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GENDERS:
      return merge({}, action.genders);
    default:
      return state;
  }
};

export const ethnicitiesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ETHNICITIES:
      return merge({}, action.ethnicities);
    default:
      return state;
  }
};