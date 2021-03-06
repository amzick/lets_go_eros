export const RECEIVE_DATUM = 'RECEIVE_DATUM';
export const RECEIVE_FIELD = "RECEIVE_FIELD";
export const RECEIVE_UI_ERRORS = "RECEIVE_UI_ERRORS";
export const RECEIVE_OPTIONS = "RECEIVE_OPTIONS";

import * as UiAPI from '../util/ui_util';

//thunk action creators
export const updateNewUser = (datum) => dispatch => {

  UiAPI.validateField(datum.field, datum.value).then((resp) => {
    if (resp.field === "birthday") {
      // inexplicably, the date conversion here (not anywhere else, using the exact same syntax) results in the date being  a day earlier
      // unless i use slash notation for the date declaration... that was fun to debug
      // https://code.i-harness.com/en/q/734def
      dispatch(receiveDatum({ field: resp.field, value: new Date(resp.value.replace(/-/g, '\/')) }));
    } else {
      dispatch(receiveDatum({ field: resp.field, value: resp.value }));
    }
  },
    (errors) => dispatch(receiveErrors(errors.responseJSON))
  );
};

export const updateField = (field) => dispatch => {
  // no return, no ajax request
  dispatch(receiveField(field));
};

export const fetchOptions = (options) => dispatch => {
  return UiAPI.fetchOptions(options).then(
    resp => dispatch(receiveOptions(resp))
  );
};


// POJO actions
const receiveDatum = ({ field, value }) => {
  return ({
    type: RECEIVE_DATUM,
    field,
    value,
  });
};

const receiveField = (field) => {
  return ({
    type: RECEIVE_FIELD,
    field,
  });
};

export const receiveErrors = (array) => {
  return ({
    type: RECEIVE_UI_ERRORS,
    errors: array,
  });
};

const receiveOptions = (options) => {

  return ({
    type: RECEIVE_OPTIONS,
    options,
  });
};


// export const RECEIVE_EMAIL = "RECEIVE_EMAIL";
// export const RECEIVE_PASSWORD = "RECEIVE_PASSWORD";
// export const RECEIVE_FNAME = "RECEIVE_FNAME";
// export const RECEIVE_GENDERS = "RECEIVE_GENDERS";
// export const RECEIVE_BIRTHDAY = "RECEIVE_BIRTHDAY";
// export const RECEIVE_LOCATION = "RECEIVE_LOCATION";

// not needed because I'm not making async requests

//actions: one for each piece of information

// const receiveEmail = (email) => {
//   return ({
//     type: RECEIVE_EMAIL,
//     email
//   });
// };

// const receivePassword = (password) => {
//   return ({
//     type: RECEIVE_PASSWORD,
//     password
//   });
// };

// const receiveFname = (fname) => {
//   return ({
//     type: RECEIVE_FNAME,
//     fname
//   });
// };

// const receiveGenders = (genderIds) => {
//   return ({
//     type: RECEIVE_GENDERS,
//     genderIds
//   });
// };

// const receiveBirthday = (birthday) => {
//   return ({
//     type: RECEIVE_BIRTHDAY,
//     birthday
//   });
// };

// const receiveLocation = (location) => {
//   return ({
//     type: RECEIVE_LOCATION,
//     location
//   });
// };