// custom routes to make ajax requests

export const validateField = (field, value) => {
  return $.ajax({
    method: "GET",
    url: `/api/validity/${field}/${value}`,
  });
};