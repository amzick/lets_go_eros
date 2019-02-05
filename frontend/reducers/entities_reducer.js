import { combineReducers } from 'redux';
import { usersReducer, gendersReducer, ethnicitiesReducer } from './users_reducer';
import messagesReducer from './messages_reducer';


const entitiesReducer = combineReducers({
  users: usersReducer,
  genders: gendersReducer,
  ethnicities: ethnicitiesReducer,
  messages: messagesReducer,
});

export default entitiesReducer;