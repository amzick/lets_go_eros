import * as QuestionApiUtil from '../util/question_api_util';

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

// too much of a pain to do it this way, just getting the question id with the ajax request
// export const fetchRandomUnansweredQuestion = (userID) => {
//   return (dispatch) => {
//     return QuestionApiUtil.fetchRandomUnansweredQuestion(userID).then(resp => {
//       dispatch(receiveQuestion(resp));
//     });
//   };
// };

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