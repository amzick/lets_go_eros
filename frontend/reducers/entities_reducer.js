import { combineReducers } from 'redux';
import { usersReducer, gendersReducer, ethnicitiesReducer } from './users_reducer';
import messagesReducer from './messages_reducer';
import heartsReducer from './hearts_reducer';
import questionsReducer from './questions_reducer';


const entitiesReducer = combineReducers({
  users: usersReducer,
  genders: gendersReducer,
  ethnicities: ethnicitiesReducer,
  messages: messagesReducer,
  hearts: heartsReducer,
  questions: questionsReducer
});

export default entitiesReducer;