import {RECEIVE_HEARTS, RECEIVE_HEART, REMOVE_HEART} from '../actions/heart_actions';
import {merge} from 'lodash';

const heartsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_HEARTS:
      return action.hearts;
    case RECEIVE_HEART:
      newState = merge({}, state);
      return merge(newState, {[action.heart.id]: action.heart});
    case REMOVE_HEART:
      newState = merge({}, state);
      delete newState[action.heart.id];
      return newState;
    default:
      return state;
  }
}

export default heartsReducer;