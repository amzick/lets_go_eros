import { RECEIVE_OPTIONS } from '../actions/ui_actions';

// import { merge } from 'lodash';

const _nullOptions = [];

export const optionsReducer = (state = _nullOptions, action) => {
  Object.freeze(state);
  // let newState;
  
  switch (action.type) {
    case RECEIVE_OPTIONS:
      return action.options;
    default:
      return state;
  };
};