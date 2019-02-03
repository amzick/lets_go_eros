// custom routes to make ajax requests

export const validateField = (field, value) => {
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