export const fetchQuestion = (questionID) => {
  return $.ajax({
    method:"GET",
    url: `/api/questions/${questionID}`
  });
};