import { RECEIVE_FIELD } from '../actions/ui_actions';

//default is email

export const fieldReducer = (state = "", action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FIELD:
      return action.field;
    default:
      return state;
  };
};