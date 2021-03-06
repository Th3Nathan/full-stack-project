import { connect } from 'react-redux';
import { fetchStories, updateStoryBookmarks, fetchSingleStory } from '../../actions/story_actions';
import { storiesSelector } from "../../reducers/selectors";
import { withRouter } from 'react-router-dom';
import StoriesIndex from './stories_index';

const mapStateToProps = (state, ownProps) => {
  return {
    stories: storiesSelector(state.stories.all),
    user_id: state.session.currentUser.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
  fetchStories: user => dispatch(fetchStories()),
  updateStoryBookmarks: (story, id) => dispatch (updateStoryBookmarks(story, id)),
  fetchSingleStory: (id) => dispatch (fetchSingleStory(id))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StoriesIndex)
);
