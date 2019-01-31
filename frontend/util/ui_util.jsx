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

export const revealLocation = (zip) => {
  return $.ajax({
    method: "GET",
    // url: `http://api.zippopotam.us/us/${zip}`,
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${window.googleAPIKey}`,
  });
};