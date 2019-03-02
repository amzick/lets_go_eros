import { RECEIVE_DISTANCE } from '../actions/distance_actions';
import { merge } from 'lodash';

const distancesReducer = (state = {}, action) => {
  Object.freeze(state);

  let newState;
  let tempSet;
  switch (action.type) {
    case RECEIVE_DISTANCE:
      switch (true) {
        case (action.distance <= 2):

          tempSet = state["2"] || new Set();
          tempSet.add(action.userID);
          newState = {2: tempSet};
          break;
        case (action.distance <= 5):
          tempSet = state["5"] || new Set();
          tempSet.add(action.userID);
          newState = { 5: tempSet };
          break;
        case (action.distance <= 10):
          tempSet = state["10"] || new Set();
          tempSet.add(action.userID);
          newState = { 10: tempSet };
          break;
        default:
          tempSet = state["10+"] || new Set();
          tempSet.add(action.userID);
          newState = { "10+": tempSet };
          break;
      }
      return merge({}, state, newState);
    default:
      return state;
  }
};

export default distancesReducer;