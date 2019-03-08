import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/root_reducer";
import logger from 'redux-logger';
// import thunk from '../middlewares/thunk';
import thunk from 'redux-thunk';

// having an array of middlewares allows us to have different middlewares for production / development
const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));
};

export default configureStore;