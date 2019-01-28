import { combineReducers } from 'redux';
import { errorsSessionReducer } from './errors_session_reducer';
import { errorsUiReducer} from './errors_ui_reducer';

const errorsReducer = combineReducers({
  session: errorsSessionReducer,
  ui: errorsUiReducer,
});


export default errorsReducer;
