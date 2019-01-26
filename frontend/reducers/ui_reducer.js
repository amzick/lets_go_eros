import { RECEIVE_DATUM } from '../actions/ui_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _newUser = {
  email: "",
  password: "",
  fname: "",
  genders: [],
  birthday: new Date(),
  location: 0
};

export const uiReducer = (state = _newUser, action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_DATUM:
      newState = { [action.field]: action.value };
      return merge({}, state, newState);
    case RECEIVE_CURRENT_USER:
      return _newUser;
    default:
      return state;
  }
};