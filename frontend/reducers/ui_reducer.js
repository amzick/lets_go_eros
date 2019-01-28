import { combineReducers } from 'redux';
import { newUserReducer } from './new_user_reducer';
import { fieldReducer } from './field_reducer';
import { optionsReducer } from './options_reducer';

const uiReducer = combineReducers({
  newUser: newUserReducer,
  field: fieldReducer,
  options: optionsReducer,
});

export default uiReducer;