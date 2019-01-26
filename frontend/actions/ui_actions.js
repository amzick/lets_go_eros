export const RECEIVE_DATUM = 'RECEIVE_DATUM';

//thunk action creators
export const updateNewUser = (datum) => dispatch => {
  //eventually this will make a validity check ajax request to a custom route
  return () => {
    dispatch(receiveDatum(datum));
  };
};

const receiveDatum = ({field, value}) => {
  return ({
    type: RECEIVE_DATUM,
    field,
    value,
  });
};


// export const RECEIVE_EMAIL = "RECEIVE_EMAIL";
// export const RECEIVE_PASSWORD = "RECEIVE_PASSWORD";
// export const RECEIVE_FNAME = "RECEIVE_FNAME";
// export const RECEIVE_GENDERS = "RECEIVE_GENDERS";
// export const RECEIVE_BIRTHDAY = "RECEIVE_BIRTHDAY";
// export const RECEIVE_LOCATION = "RECEIVE_LOCATION";

// not needed because I'm not making async requests?

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