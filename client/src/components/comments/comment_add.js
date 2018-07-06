import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import './comment_add.css';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { TextField } from 'redux-form-material-ui';
import { loadCommentForm } from '../../_actions/actions_comments';

let CommentAdd = ({ handleSubmit, idTask, load }) => {
  const initialValues = {
    id: Date.now(),
    task_id: idTask,
    user: {
      fullName: 'Harry Potter',
      avatar: 'https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/box_620_330/image.jpg',
    },
    created_at: new Date(),
    updated_at: '',
  };

  load(initialValues);

  return (
    <Paper className="comment-add">
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Field
          name="content"
          multiline
          rows={4}
          component={TextField}
          type="text"
          className="comment-field"
          label="Add comment"
        />
        <Button type="submit" variant="contained" color="primary" className="comment-submit-btn">
          Comment
        </Button>
      </form>
    </Paper>
  );
};

CommentAdd.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  idTask: PropTypes.string.isRequired,
  load: PropTypes.func.isRequired,
};

CommentAdd = reduxForm({
  form: 'comment_add',
})(CommentAdd);

CommentAdd = connect(
  state => ({
    initialValues: state.comments.commentForm,
  }),
  { load: loadCommentForm },
)(CommentAdd);

export default CommentAdd;
