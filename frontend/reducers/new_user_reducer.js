import { RECEIVE_DATUM } from '../actions/ui_actions';
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const _newUser = {
  email: "",
  password: "",
  fname: "",
  genders: new Set(),
  ethnicities: new Set(),
  birthday: new Date(),
  location: undefined
};

// make new sub fields for field and validity. so the state would be {_newUser:{...}, field:'email', valid: false}
// the onChange will query the data base for validty and update the store. the parent container can change the class of the button via the store
// test with username / password first

export const newUserReducer = (state = _newUser, action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_DATUM:
    
      newState = { [action.field]: action.value };

      return merge({}, state, newState);
    case RECEIVE_CURRENT_USER:
    case LOGOUT_CURRENT_USER:
      return _newUser;
    default:
      return state;
  }
};