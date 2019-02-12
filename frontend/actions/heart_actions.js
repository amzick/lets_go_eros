import * as HeartApiUtil from '../util/heart_api_util';

export const RECEIVE_HEARTS = "RECEIVE_HEARTS";
export const RECEIVE_HEART = "RECEIVE_HEART";
export const REMOVE_HEART = "REMOVE_HEART";

export const recieveHeart = (heartID) => {
  return (dispatch) => {
    return HeartApiUtil.fetchHeart(heartID).then(resp => {
      dispatch(receiveHeart(resp));
    });
  };
};

export const createHeart = (crushID) => {
  return (dispatch) => {
    return HeartApiUtil.createHeart(crushID).then(resp => {
      dispatch(receiveHeart(resp));
    });
  };
};

export const deleteHeart = (crushID) => {
  return (dispatch) => {
    return HeartApiUtil.deleteHeart(crushID).then(resp => {
      dispatch(removeHeart(resp));
    });
  };
};

const receiveHeart = (heart) => {
  return {
    type: RECEIVE_HEART,
    heart
  };
};

const removeHeart = (heart) => {
  return {
    type: REMOVE_HEART,
    heart
  };
};
