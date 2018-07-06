import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import './comment_card.css';

class CommentCard extends Component {
  constructor(props) {
    super(props);
    const { comment } = this.props;
    this.state = {
      edit: false,
      content: comment.content,
    };

    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick() {
    const { edit, content } = this.state;
    const { comment, taskId, handleEdit } = this.props;

    this.setState({ edit: !edit });
    if (edit) {
      handleEdit(taskId, comment.id, content);
    }
  }

  renderContent() {
    const { comment } = this.props;
    const { edit, content } = this.state;

    if (!edit) {
      return (
        <Typography component="p">
          {comment.content}
        </Typography>
      );
    }

    return (
      <textarea defaultValue={content} className="comment-edit-field" onChange={e => this.setState({ content: e.target.value })} />
    );
  }

  render() {
    const { comment } = this.props;
    return (
      <Card className="comment-card">
        <CardContent className="comment-container">
          <div className="comment-author-avatar">
            <img src={comment.user.avatar} alt="author-avater" />
          </div>
          <div className="comment-content">
            <div className="comment-header">
              <div className="commnt-author">
                {comment.user.fullName}
              </div>
              <div className="commnt-data">
                {comment.created_at}
              </div>
            </div>
            <div className="comment-body">
              { this.renderContent() }
            </div>
          </div>
        </CardContent>
        <CardActions className="comments-btn">
          <Button onClick={this.handleEditClick} variant="fab" mini color="primary" aria-label="add" className="comment-edit">
            <EditIcon />
          </Button>
          <Button variant="fab" mini color="secondary" aria-label="add" className="comment-edit">
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>
    );
  }
}

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  taskId: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default CommentCard;
