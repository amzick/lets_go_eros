import { combineReducers } from 'redux';
import { usersReducer, gendersReducer, ethnicitiesReducer } from './users_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  genders: gendersReducer,
  ethnicities: ethnicitiesReducer,
});

export default entitiesReducer;