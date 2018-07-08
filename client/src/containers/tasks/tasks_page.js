import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset } from 'redux-form';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import TaskCard from '../../components/tasks/task_card';
import TaskForm from '../../components/tasks/task_form';
import {
  editTask,
  fetchTasks,
  addTask,
  deleteTask,
} from '../../_actions/action_tasks';

const TaskActionCreators = {
  editTask,
  fetchTasks,
  addTask,
  deleteTask,
};

class TasksPage extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(TaskActionCreators, dispatch);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    const action = TaskActionCreators.fetchTasks();
    dispatch(action);
  }

  onSave(values) {
    const { dispatch } = this.props;

    const action = TaskActionCreators.addTask(values);
    dispatch(action);
    dispatch(reset('task_form'));
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
        { isSuperuser ? <TaskForm formAction="add" onSubmit={this.onSave} /> : false }
        <div className="tasks-list">
          {this.renderTaskList()}
        </div>
      </div>
    );
  }
}

TasksPage.defaultProps = {
  onChangeStatus: () => {},
  loadTasks: () => {},
};

TasksPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  isSuperuser: PropTypes.bool.isRequired,
  onChangeStatus: PropTypes.func,
  loadTasks: PropTypes.func,
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
