import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset } from 'redux-form';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import TaskCard from '../../components/tasks/task_card';
import TaskForm from '../../components/tasks/task_form';
import { editTask, fetchTasks, sendTask, deleteTask } from '../../_actions/action_tasks';

const TaskActionCreators = {
  editTask,
  fetchTasks,
  sendTask,
  deleteTask,
};

class TasksPage extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(TaskActionCreators, dispatch);
    this.onSave = this.onSave.bind(this);
  }

  static defaultProps = {
    onChangeStatus: function () {},
    loadTasks: function () {},
  };

  componentDidMount() {
    let { dispatch } = this.props;

    const action = TaskActionCreators.fetchTasks();
    dispatch(action);
  }

  onSave(values) {
    let { dispatch } = this.props;

    const action = TaskActionCreators.sendTask(values.title, values.description);
    dispatch(action);
    dispatch(reset('task_add'));
  }

  renderTaskList() {
    const { tasks, isSuperuser } = this.props;
    return tasks.map(task => (
      <TaskCard
        key={task._id}
        data={task}
        isSuperuser={isSuperuser}
        {...this.boundActionCreators}
      />
    ));
  }

  render() {
    const { isFetching, didInvalidate, isSuperuser } = this.props;
    if (isFetching) {
      return (
        <CircularProgress />
      );
    }

    if (didInvalidate) {
      return (
        <Typography variant="display1" gutterBottom>
          Oops something is wrong.
        </Typography>
      );
    }

    return (
      <div className="tasks-page">
        <Typography variant="display1" gutterBottom>
          Your tasks
        </Typography>
        { isSuperuser ? <TaskForm formAction='add' onSubmit={this.onSave} /> : false }
        <div className="tasks-list">
          {this.renderTaskList()}
        </div>
      </div>
    );
  }
}

TasksPage.propTypes = {
  tasks: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  isSuperuser: PropTypes.bool.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  loadTasks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tasks: state.tasks.data,
  isFetching: state.tasks.isFetching,
  isSuperuser: state.auth.user.isSuperuser,
  didInvalidate: state.tasks.didInvalidate,
});

export default connect(
  mapStateToProps,
)(TasksPage);
