import { RECEIVE_QUESTIONS, RECEIVE_QUESTION } from '../actions/question_actions';
import { merge } from 'lodash';

const questionsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return action.questions;
    case RECEIVE_QUESTION:
      if (action.question !== null) {
        newState = merge({}, state);
        return merge(newState, { [action.question.id]: action.question });
      } else {
        return state;
      };
    default:
      return state;
  }
};

export default questionsReducer;