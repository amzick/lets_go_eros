export const RECEIVE_DISTANCE = "RECEIVE_DISTANCE";

// import { revealDistance } from '../util/ui_util';

// thunk actions creators
export const fetchDistance = (currentUser, user2) => dispatch => {
  /*
  google's getDistanceMatrix is asynchronous but doesn't return a promise
  the following steps allow me to make that happen
  src: https://stackoverflow.com/questions/19125716/wait-for-the-end-of-an-asynchronous-javascript-function-to-retrieve-a-result-de
  */

  
  const service = new google.maps.DistanceMatrixService;
  const dfd = $.Deferred();
  service.getDistanceMatrix({
    origins: [new google.maps.LatLng(currentUser.lat, currentUser.lng)],
    destinations: [new google.maps.LatLng(user2.lat, user2.lng)],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL
  }, (resp, status) => {
    if (status == google.maps.DistanceMatrixStatus.OK) {
      let miles;
      if (resp.rows[0].elements[0].distance === undefined) {
        // if the matrix can't figure out the distance I have to use geomotry to get the straight line distance
        const meters = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(currentUser.lat, currentUser.lng),
          new google.maps.LatLng(user2.lat, user2.lng)
        );
        miles = meters / 1000 * 0.621371192;
      } else {
        miles = resp.rows[0].elements[0].distance.value / 1000 * 0.621371192;
      }
      dispatch(receiveDistance(user2.id, miles));
      dfd.resolve(resp);
    } else {
      dfd.reject(status);
    }
  });
  return dfd.promise();
  

  /* 
  ended up switching to the google geometry instead of distance matrix because
  I was getting errors where the distance matrix couldn't figure out the location and was returning undefined
  const meters = google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(currentUser.lat, currentUser.lng),
    new google.maps.LatLng(user2.lat, user2.lng)
    );
    const miles = meters / 1000 * 0.621371192;
    dispatch(receiveDistance(user2.id, miles));
 */

};

export const fetchDistances = (currentUser, usersArray) => dispatch => {
  const dfd = $.Deferred();
  let counter = 0;
  usersArray.forEach(user => {
    if (user.id !== currentUser.id) {
      dispatch(fetchDistance(currentUser, user)).then(() => {
        counter++;
        console.log(user.id, counter);
        if (counter >= usersArray.length - 1) {
          // minus one because the current user
          // debugger
          dfd.resolve();
        }
      });
    }
  });
  return dfd.promise();
};

// actions
const receiveDistance = (userID, distance) => {
  return {
    type: RECEIVE_DISTANCE,
    userID,
    distance,
  };
};