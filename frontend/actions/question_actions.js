import * as QuestionApiUtil from '../util/qustion_api_util';

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const RECEIVE_QUESTION = "RECEIVE_QUESTION";

// thunk action creators
export const fetchQuestion = (questionID) => {
  return (dispatch) => {
    return QuestionApiUtil.fetchQuestion(questionID).then(resp => {
      dispatch(receiveQuestion(resp));
    });
  };
};

// actions

const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
};

const receiveQuestion = (question) => {
  return {
    type: RECEIVE_QUESTION,
    question,
  };
};