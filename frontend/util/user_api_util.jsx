
export const fetchUser = (userId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}`
  });
};

export const fetchUsers = (idsArray = null) => {
  return $.ajax({
    method: "GET",
    url: 'api/users/',
    data: {ids_array: idsArray}
  });
};

export const fetchFirstLast = () => {
  return $.ajax({
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

export const updateUser = (user) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: { user }
  });
}