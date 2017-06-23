export const createStory = formData => {
  return $.ajax({
    method: "POST",
    url: "/api/stories",
    contentType: false,
    processData: false,
    data: formData,
  });
};

export const updateStory = (formData, id) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/stories/${id}`,
    contentType: false,
    processData: false,
    data: formData,
  });
};

export const removeStory = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/session/${id}`,
  });
};

export const fetchStories = () => {
  return $.ajax({
    method: 'GET',
    url: "api/stories",
  });
};

export const fetchSingleStory = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/stories/${id}`,
  });
};
