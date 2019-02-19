export const fetchQuestion = (questionID) => {
  return $.ajax({
    method: "GET",
    url: `/api/questions/${questionID}`
  });
};

export const fetchRandomUnansweredQuestion = (userID) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userID}/random_unanswered_question`
  });
};

export const fetchRandomAnsweredQuestion = (userID) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userID}/random_answered_question`
  });
};

export const createResponse = (response) => {
  return $.ajax({
    method: "POST",
    url: "/api/responses/",
    data: { response },
  });
};

export const updateResponse = (response) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/responses/${response.id}`,
    data: { response }
  });
};