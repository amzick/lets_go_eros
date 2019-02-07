export const fetchUserMessages = (userID) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userID}/messages`
  });
};

export const fetchMessages = (array) => {
  return $.ajax({
    method: "GET",
    url: `api/messages/limited/${array}`
  });
};

export const fetchMessagesBetween = (userID1, userID2) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userID1}/messages_with/${userID2}`,
  });
};
