import { connect } from 'react-redux';
import { addStory } from '../../actions/story_actions';
import { withRouter } from 'react-router-dom';
import StoryForm from './story_form';
import { updateDraft } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    draft: state.session.draft,
    formType: "new"
  };
};

const mapDispatchToProps = dispatch => {
  return {
  addStory: () => dispatch(addStory()),
  updateDraft: (draft) => dispatch(updateDraft(draft)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StoryForm)
);
