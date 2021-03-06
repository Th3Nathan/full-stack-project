import * as APIUtil from '../util/story_util';

export const RECEIVE_STORIES = 'RECEIVE_STORIES';
export const RECEIVE_SINGLE_STORY = 'RECEIVE_SINGLE_STORY';
export const UPDATE_STORY = 'UPDATE_STORY';
export const DELETE_STORY = 'DELETE_STORY';
export const CREATE_STORY = 'CREATE_STORY';
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_FEED = "RECEIVE_FEED";
export const RECEIVE_SINGLE_FEED = "RECEIVE_SINGLE_FEED";

export const receiveStories = (stories) => {
  return {
    type: RECEIVE_STORIES,
    stories
  };
};

export const receiveFeed = stories => {
  return {
    type: RECEIVE_FEED,
    stories
  };
};

export const receiveSingleStory = story => {
  return {
    type: RECEIVE_SINGLE_STORY,
    story
  };
};

export const receiveSingleFeed = story => {
  return {
    type: RECEIVE_SINGLE_FEED,
    story
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const addStory = story => {
  return {
    type: CREATE_STORY,
    story
  };
};

export const deleteStory = id => {
  return {
    type: DELETE_STORY,
    id
  };
};

export const update = story => {
  return {
    type: UPDATE_STORY,
    story
  };
};

export const fetchStories = () => dispatch => {
  return APIUtil.fetchStories()
    .then(stories => {
      return dispatch(receiveStories(stories));
    });
};

export const fetchSingleStory = (id) => dispatch => {
  return APIUtil.fetchSingleStory(id)
    .then(story => {
      return dispatch(receiveSingleStory(story));
    });
};

export const fetchSingleFeed = (id) => dispatch => {
  return APIUtil.fetchSingleStory(id)
    .then(story => {
      return dispatch(receiveSingleFeed(story));
    });
};

export const updateStory = (newStory, id) => dispatch => {
  return APIUtil.updateStory(newStory, id)
    .then(story => {
      return dispatch(update(story));
    });
};

export const updateStoryLikes = (newStory, id) => dispatch => {
  return APIUtil.updateStoryLikes(newStory, id)
    .then(story => {
      return dispatch(update(story));
    });
};

export const updateStoryBookmarks = (newStory, id) => dispatch => {
  return APIUtil.updateStoryBookmarks(newStory, id)
    .then(story => {
      return dispatch(update(story));
    });
};

export const createStory = (story) => dispatch => {
  return APIUtil.createStory(story)
    .then(story => {return dispatch(addStory(story));
    });
};

export const destroyStory = id => dispatch => {
  return APIUtil.removeStory(id).then((story) => {
    return dispatch(deleteStory(id));
  });
};

export const feed = () => dispatch => {
  return APIUtil.feed().then((stories) => {
    return dispatch(receiveFeed(stories));
  });
};

export const bookmarked = () => dispatch => {
  return APIUtil.bookmarked().then((stories) => {
    return dispatch(receiveBookmarked(stories));
  });
};
