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

export const fetchMessage = (messageID) => {
  return $.ajax({
    method: "GET",
    url: `/api/messages/${messageID}`,
  });
};

export const createMessage = (message) => {
  return $.ajax({
    method: "POST",
    url: `/api/users/${message.sender_id}/messages`,
    data: { message }
  });
};