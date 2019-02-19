export const fetchQuestion = (questionID) => {
  return $.ajax({
    method:"GET",
    url: `/api/questions/${questionID}`
  });
};

export const fetchRandomUnansweredQuestion = (userID) => {
  return $.ajax({
    method:"GET",
    url: `/api/users/${userID}/random_unanswered_question`
  });
};