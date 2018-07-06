import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';

import TaskCard from '../../components/tasks/task_card';
import { editTask, fetchTaskDetail, deleteTask } from '../../_actions/action_tasks';
import { fetchComments, addComment } from '../../_actions/actions_comments';
// import CommentsList from '../comments/comments_list';
// import CommentAdd from '../../components/comments/comment_add';

const TaskActionCreators = {
  editTask,
  fetchTaskDetail,
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

  static defaultProps = {
    task: {
      _id: "",
      title: "",
      description: "",
      status: "",
    },
    onLoad: function () {},
    onChangeStatus: function () {},
    addNewComment: function () {},
  };

  componentDidMount() {
    const { dispatch, match } = this.props;

    const actionFetchTaskDetail = TaskActionCreators.fetchTaskDetail(match.params.id);
    // const actionFetchComments = TaskActionCreators.fetchComments();
    dispatch(actionFetchTaskDetail);
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
    const { task } = this.props;

    if (task === null) {
      return (
        <CircularProgress />
      );
    }

    return (
      <div className="task-detail-page">
        <TaskCard
          data={task}
          statusCallback={this.handleChangeStatus}
          {...this.boundActionCreators}
        />
        {/* <CommentsList taskId={task.id} /> */}
        {/* <CommentAdd taskId={task.id} onSubmit={this.onSubmit} /> */}
      </div>
    );
  }
}


TaskDetailPage.propTypes = {
  task: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  addNewComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  task: state.tasks.detail,
});

export default connect(mapStateToProps)(TaskDetailPage);
