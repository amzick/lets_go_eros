import * as UserApiUtil from '../util/user_api_util';
// import { revealLocation } from '../util/ui_util';


export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_GENDERS = 'RECEIVE_GENDERS';
export const RECEIVE_ETHNICITIES = 'RECEIVE_ETHNICITIES';


//thunk action creators
export const fetchUser = (userID) => {
  return (dispatch) => {
    return UserApiUtil.fetchUser(userID).then(resp => dispatch(receiveUser(resp)));
  };
};

  export const fetchUsers = (idsArray = null) => {
    return (dispatch) => {
      UserApiUtil.fetchUsers(idsArray).then(resp => dispatch(receiveUsers(resp)));
    };
  };

  


  export const fetchGenders = () => {
    return (dispatch) => {
      UserApiUtil.fetchGenders().then(resp => {
        dispatch(receiveGenders(resp));
      });
    };
  };

  export const fetchEthnicities = () => {
    return (dispatch) => {
      UserApiUtil.fetchEthnicities().then(resp => {
        dispatch(receiveEthnicities(resp));
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

  const receiveUsers = (users) => {
    return {
      type: RECEIVE_USERS,
      users
    };
  };

  const receiveGenders = (genders) => {
    return {
      type: RECEIVE_GENDERS,
      genders,
    };
  };

  const receiveEthnicities = (ethnicities) => {
    return {
      type: RECEIVE_ETHNICITIES,
      ethnicities,
    };
  };