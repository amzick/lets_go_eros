import * as MessageApiUtil from '../util/message_api_util';

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const fetchUserMessages = (userID) => {
  return (dispatch) => {
    return MessageApiUtil.fetchUserMessages(userID).then(resp => {
      dispatch(receiveMessages(resp));
    });
  };
};

export const fetchMessages = (array) => {
  return (dispatch) => {
    return MessageApiUtil.fetchMessages(array).then(resp => {
      dispatch(receiveMessages(resp));
    });
  };
}

// the util is just returning an array directly. use fetchUserMessages to get the messages
// export const fetchMessagesBetween = (userID1, userID2) => {
//   return (dispatch) => {
//     return MessageApiUtil.fetchMessagesBetween(userID1, userID2).then(resp => {
//       dispatch(receiveMessages(resp));
//     });
//   };
// };

const receiveMessages = (messages) => {
  return {
    type: RECEIVE_MESSAGES,
    messages,
  };
};