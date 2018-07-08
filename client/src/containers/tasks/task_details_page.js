import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';

import TaskCard from '../../components/tasks/task_card';
import { editTask, fetchTask, deleteTask } from '../../_actions/action_tasks';
import { fetchComments, addComment } from '../../_actions/actions_comments';
// import CommentsList from '../comments/comments_list';
// import CommentAdd from '../../components/comments/comment_add';

const TaskActionCreators = {
  editTask,
  fetchTask,
  fetchComments,
  addComment,
  deleteTask,
};

class TaskDetailPage extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(TaskActionCreators, dispatch);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;

    const actionFetchTask = TaskActionCreators.fetchTask(match.params.id);
    // const actionFetchComments = TaskActionCreators.fetchComments();
    dispatch(actionFetchTask);
    // dispatch(actionFetchComments);
  }

  handleChangeStatus(id, task) {
    const { onChangeStatus } = this.props;
    onChangeStatus(id, task);
  }

  onSubmit(values) {
    const { task } = this.props;
    const { addNewComment } = this.props;
    addNewComment(task._id, values);
  }

  render() {
    const { task, isFetchingTask, isSuperuser } = this.props;

    if (isFetchingTask) {
      return (
        <CircularProgress />
      );
    }

    return (
      <div className="task-detail-page">
        <TaskCard
          data={task}
          isSuperuser={isSuperuser}
          statusCallback={this.handleChangeStatus}
          {...this.boundActionCreators}
        />
        {/* <CommentsList taskId={task.id} /> */}
        {/* <CommentAdd taskId={task.id} onSubmit={this.onSubmit} /> */}
      </div>
    );
  }
}

TaskDetailPage.defaultProps = {
  task: {
    _id: '',
    title: '',
    description: '',
    status: '',
  },
  isFetchingTask: true,
  isSuperuser: false,
  onLoad: () => {},
  onChangeStatus: () => {},
  addNewComment: () => {},
};

TaskDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  task: PropTypes.object,
  onLoad: PropTypes.func,
  match: PropTypes.object.isRequired,
  onChangeStatus: PropTypes.func,
  addNewComment: PropTypes.func,
  isFetchingTask: PropTypes.bool,
  isSuperuser: PropTypes.bool,
};

const mapStateToProps = state => ({
  task: state.tasks.detail,
  isFetchingTask: state.tasks.isFetchingTask,
  isSuperuser: state.auth.user.isSuperuser,
});

export default connect(mapStateToProps)(TaskDetailPage);
