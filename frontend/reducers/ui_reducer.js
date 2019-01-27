import { combineReducers } from 'redux';
import { newUserReducer } from './new_user_reducer';
import { fieldReducer } from './field_reducer';

const uiReducer = combineReducers({
  newUser: newUserReducer,
  field: fieldReducer,
});

export default uiReducer;