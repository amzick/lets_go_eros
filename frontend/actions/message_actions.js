import * as MessageApiUtil from '../util/message_api_util';

export const RECEIVE_MESSAGES = "RECEIVE_USER_MESSAGES";

export const fetchUserMessages = (userID) => {
  return (dispatch) => {
    return MessageApiUtil.fetchUserMessages(userID).then(resp => {
      dispatch(receiveMessages(resp));
    });
  };
};

const receiveMessages = (messages) => {
  return {
    type: RECEIVE_MESSAGES,
    messages,
  };
};