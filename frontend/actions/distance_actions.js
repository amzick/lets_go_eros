export const RECEIVE_DISTANCE = "RECEIVE_DISTANCE";

// import { revealDistance } from '../util/ui_util';

// thunk actions creators
export const fetchDistance = (currentUser, user2) => dispatch => {
  const service = new google.maps.DistanceMatrixService;
  return service.getDistanceMatrix({
    origins: [new google.maps.LatLng(currentUser.lat, currentUser.lng)],
    destinations: [new google.maps.LatLng(user2.lat, user2.lng)],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL
  }, (resp) => {
    const miles = resp.rows[0].elements[0].distance.value / 1000 * 0.621371192;
    dispatch(receiveDistance(user2.id,miles));
  });
};

// actions
const receiveDistance = (userID, distance) => {
  return {
    type: RECEIVE_DISTANCE,
    userID,
    distance,
  };
};