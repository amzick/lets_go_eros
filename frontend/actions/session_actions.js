import * as SessionAPI from '../util/session_api_util';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

// thunk action creators
export const login = (user) => dispatch => {
  // testing START HERE
  return (
    SessionAPI.login(user).then((resp) => dispatch(receiveCurrentUser(resp)),
      (errors) => dispatch(receiveErrors(errors.responseJSON)))
  );
};

export const logout = () => dispatch => {
  return (
    SessionAPI.logout()
      .then(() => dispatch(logoutCurrentUser()),
        (errors) => dispatch(receiveErrors(errors.responseJSON)))
  );
};

export const signup = (user) => dispatch => {
  return (
    SessionAPI.signup(user)
      .then((user) => dispatch(receiveCurrentUser(user)),
        (errors) => dispatch(receiveErrors(errors.responseJSON)))
  );
};

//actions
const receiveCurrentUser = (user) => {
  return ({
    type: RECEIVE_CURRENT_USER,
    user: user,
  });
};

const logoutCurrentUser = () => {
  return ({
    type: LOGOUT_CURRENT_USER,
  });
};

const receiveErrors = (array) => {
  return ({
    type: RECEIVE_SESSION_ERRORS,
    errors: array,
  });
};

export const clearErrors = () => {
  return({
    type: CLEAR_ERRORS,
  });
};
