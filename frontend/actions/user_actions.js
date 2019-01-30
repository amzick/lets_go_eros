import * as UserApiUtil from '../util/user_api_util';
import { revealLocation } from '../util/ui_util';


export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_GENDERS = 'RECEIVE_GENDERS';
export const RECEIVE_ETHNICITIES = 'RECEIVE_ETHNICITIES';


//thunk action creators
export const fetchUser = (userId) => {
  return (dispatch) => {
    UserApiUtil.fetchUser(userId)
      .then(resp => {
        // make request using location, add into response
        revealLocation(resp.location).then((info) => {
          resp.city = info.places[0]["place name"];
          resp.state = info.places[0]["state abbreviation"];
        }).then(() => {
          return dispatch(receiveUser(resp));
        });
      });
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