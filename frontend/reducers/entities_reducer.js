import { combineReducers } from 'redux';
import { usersReducer, gendersReducer, ethnicitiesReducer } from './users_reducer';
import messagesReducer from './messages_reducer';
import heartsReducer from './hearts_reducer';


const entitiesReducer = combineReducers({
  users: usersReducer,
  genders: gendersReducer,
  ethnicities: ethnicitiesReducer,
  messages: messagesReducer,
  hearts: heartsReducer
});

export default entitiesReducer;