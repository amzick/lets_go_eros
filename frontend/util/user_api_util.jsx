
export const fetchUser = (userId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}`
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