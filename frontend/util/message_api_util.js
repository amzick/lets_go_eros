export const fetchUserMessages = (userID) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userID}/messages`
  });
};