import { combineReducers } from 'redux';
import { errorsSessionReducer } from './errors_session_reducer';

const errorsReducer = combineReducers({
  session: errorsSessionReducer,
});


export default errorsReducer;
