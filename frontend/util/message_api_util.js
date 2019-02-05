export const fetchUserMessages = (userID) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userID}/messages`
  });
};

export const fetchMessagesBetween = (userID1, userID2) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userID1}/messages_with/${userID2}`,
  });
};
