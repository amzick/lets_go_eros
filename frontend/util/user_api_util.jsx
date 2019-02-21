
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

export const fetchLocalUsers = (userID, maxResultSize = 40, radius = 500) => {
  return $.ajax({
    method: "GET",
    url: `api/users/${userID}/nearby`,
    data: { max_result_size: maxResultSize, radius: radius}
  });
};

// originally used to generate random users before implementing the local users API
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

export const createPhoto = (formData, userID) => {
  // last two two fields let ajax method know that we shouldn't be trying to format for rails backend, let rails handle it
  return $.ajax({
    method: "POST",
    url: `/api/users/${userID}/profile_pictures`,
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