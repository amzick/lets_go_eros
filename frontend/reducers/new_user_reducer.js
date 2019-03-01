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
  location: undefined,
  city: "",
  state: "",
  lat: 0,
  lng: 0,
};

// make new sub fields for field and validity. so the state would be {_newUser:{...}, field:'email', valid: false}
// the onChange will query the data base for validty and update the store. the parent container can change the class of the button via the store
// test with username / password first

export const newUserReducer = (state = _newUser, action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_DATUM:
      if (action.value instanceof Array) {
        // the validation of ethnicities and genders converts a set to an array so I've got to convert it back here
        newState = { [action.field]: new Set(action.value) };

      } else {
        newState = { [action.field]: action.value };

      }
      return merge({}, state, newState);
    case RECEIVE_CURRENT_USER:
      // because of poor state management from code written early on, I'm actually modifying the _newUser constant. 
      // rather than untangle the entire user creation process, this is an unideal but satisfactory fix
      return {
        email: "",
        password: "",
        fname: "",
        genders: new Set(),
        ethnicities: new Set(),
        birthday: new Date(),
        location: undefined,
        city: "",
        state: "",
        lat: 0,
        lng: 0,
      };
    case LOGOUT_CURRENT_USER:
      return {
        email: "",
        password: "",
        fname: "",
        genders: new Set(),
        ethnicities: new Set(),
        birthday: new Date(),
        location: undefined,
        city: "",
        state: "",
        lat: 0,
        lng: 0,
      };
    default:
      return state;
  }
};