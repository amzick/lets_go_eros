import { RECEIVE_DISTANCE } from '../actions/distance_actions';
import { merge } from 'lodash';

const distancesReducer = (state = {}, action) => {
  Object.freeze(state);

  let newState;
  switch (action.type) {
    case RECEIVE_DISTANCE:
      // change
      console.log("In the reducer");
      console.log(action);
      return state;
    default:
      return state;
  }
};

export default distancesReducer;