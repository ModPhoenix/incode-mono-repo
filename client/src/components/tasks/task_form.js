import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import './task_form.css';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { TextField } from 'redux-form-material-ui';

const addTaskText = {
  title: 'Add new Task',
  SubmitBtn: 'Add Task',
};

const editTaskText = {
  title: 'Edit the Task',
  SubmitBtn: 'Update Task',
};

const formActionTypes = {
  add: 'add',
  edit: 'edit',
};

class TaskForm extends Component {
  render() {
    const {
      pristine, submitting, handleSubmit, formAction,
    } = this.props;
    return (
      <Paper className="task-add">
        <Typography variant="title" gutterBottom>
          { formAction === formActionTypes.add
            ? addTaskText.title : editTaskText.title }
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off" className="task-add-form">
          <Field
            name="title"
            component={TextField}
            type="text"
            className="task-field"
            label="Task title"
          />
          <Field
            name="description"
            multiline
            rows={4}
            component={TextField}
            type="text"
            className="task-field"
            label="Task description"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="task-submit-btn"
            disabled={pristine || submitting}
          >
            { formAction === formActionTypes.add
              ? addTaskText.SubmitBtn : editTaskText.SubmitBtn }
          </Button>
        </form>
      </Paper>
    );
  }
}

TaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  formAction: PropTypes.string.isRequired,
};

TaskForm = reduxForm({
  form: 'task_form',
})(TaskForm);

export default TaskForm;
