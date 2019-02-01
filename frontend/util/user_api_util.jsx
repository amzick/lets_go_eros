
export const fetchUser = (userId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}`
  });
};

export const fetchUsers = () => {
  return $.ajax({
    method: "GET",
    url: 'api/users/',
  });
};

export const fetchFirstLast = () => {
  $.ajax({
    method: "GET",
    url: "api/first_last",
  });
};

export const fetchGenders = () => {
  return $.ajax({
    method: "GET",
    url: `api/genders`
  });
};

export const fetchEthnicities = () => {
  return $.ajax({
    method: "GET",
    url: `api/ethnicities`
  });
};

export const createPhoto = (formData) => {
  // last two two fields let ajax method know that we shouldn't be trying to format for rails backend, let rails handle it
  return $.ajax({
    method: "POST",
    url: `/api/users/${currentUser.id}/profile_pictures`,
    data: formData,
    contentType: false,
    processData: false
  });
};

