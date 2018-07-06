import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CommentCard from '../../components/comments/comment_card';
import { editeComment } from '../../_actions/actions_comments';

class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.callbackEdit = this.callbackEdit.bind(this);
  }

  callbackEdit(idTask, idComment, content) {
    const { onEditComment } = this.props;
    onEditComment(idTask, idComment, content);
  }

  renderCommentsList() {
    const { comments, taskId } = this.props;

    if (!comments[taskId]) {
      return (
        <div>
comments 0
        </div>
      );
    }

    return Object.keys(comments[taskId]).map(key => <CommentCard key={comments[taskId][key].id} taskId={taskId} comment={comments[taskId][key]} handleEdit={this.callbackEdit} />);
  }

  render() {
    return (
      <div className="comments-list">
        {this.renderCommentsList()}
      </div>
    );
  }
}

CommentsList.propTypes = {
  comments: PropTypes.object.isRequired,
  taskId: PropTypes.string.isRequired,
  onEditComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  comments: state.comments.data,
});

const mapDispatchToProps = dispatch => ({
  onEditComment: (idTask, idComment, content) => {
    dispatch(editeComment(idTask, idComment, content));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsList);
