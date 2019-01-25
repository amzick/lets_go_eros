import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";


//thunk action creators
export const fetchUser = (userId) => {
  return (dispatch) => {
    UserApiUtil.fetchUser(userId)
      .then(resp => {
        return dispatch(receiveUser(resp));
      });
  };
};

// actions

const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  };
};