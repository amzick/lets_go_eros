// custom routes to make ajax requests

export const validateField = (field, value) => {

  if (value instanceof Date) {
    value = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
  } else if (value instanceof Set) {
    value = Array.from(value);
  }

  return $.ajax({
    method: "GET",
    url: `/api/validity/${field}/${value}`,
  });
};

export const fetchOptions = (options) => {
  return $.ajax({
    method: "GET",
    url: `/api/${options}`,
  });
};

// sending only a postal code as the address
// https://stackoverflow.com/questions/52501111/google-maps-api-query-with-only-zip-code-provides-incorrect-results
export const revealLocation = (zip) => {
  return $.ajax({
    method: "GET",
    // url: `http://api.zippopotam.us/us/${zip}`,
    url: `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code%3A${zip}%7Ccountry%3AUS&key=${window.googleAPIKey}`,
  });
};

// calculate distance
// const service = new google.maps.DistanceMatrixService
// service.getDistanceMatrix({
//   origins: [new google.maps.LatLng(jay.lat, jay.lng)],
//   destinations: [new google.maps.LatLng(mary.lat, mary.lng)],
//   travelMode: 'DRIVING',
//   unitSystem: google.maps.UnitSystem.IMPERIAL
// }, resp => console.log(resp))

export const revealDistance = (currentUser, user2) => {
  const { google } = window;
  const service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [new google.maps.LatLng(currentUser.lat,currentUser.lng)],
    destinations: [new google.maps.LatLng(user2.lat,user2.lng)],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL
  }, (resp) => {
    // convert meters into miles
      const miles = resp.rows[0].elements[0].distance.value / 1000 * 0.621371192;
    // dispatch action to add user2's distance to the slice of state
  });
};