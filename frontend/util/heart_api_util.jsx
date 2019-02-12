export const fetchHeart = (heartID) => {
  return $.ajax({
    method: "GET",
    url: `/api/hearts/${heartID}`
  });
};

export const createHeart = (crushID) => {
  return $.ajax({
    method: "POST",
    url: `api/users/${crushID}/hearts`
  });
};

export const deleteHeart = (crushID) => {
  return $.ajax({
    method: "DELETE",
    url: `api/users/${crushID}/hearts`
  });
};