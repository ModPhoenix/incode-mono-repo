import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './task_card.css';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import TaskForm from './task_form';

const TASK_STATUSES = [
  'To do',
  'In Progress',
  'Peer Review',
  'Completed',
];

class TaskCard extends Component {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      taskStatus: data.status,
      edit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ taskStatus: event.target.value });
    const { editTask, data } = this.props;
    data.status = event.target.value;
    editTask(data._id, data);
  }

  handleSubmit(values) {
    const { editTask, data } = this.props;
    const { edit } = this.state;
    data.title = values.title;
    data.description = values.description;
    editTask(data._id, data);
    this.setState({ edit: !edit });
  }

  renderTaskStatuses() {
    return TASK_STATUSES.map(status => (
      <MenuItem key={status} value={status}>
        {status}
      </MenuItem>
    ));
  }

  render() {
    const { data, deleteTask, isSuperuser } = this.props;
    const { taskStatus, edit } = this.state;

    return (
      <Card className="task-card">
        {
          !edit
            ? (
              <div className="task-card-view">
                <Typography variant="caption" gutterBottom className="task-id">
                ID:
                  {' '}
                  {data._id}
                </Typography>
                <CardContent className="task-content">
                  <Link to={`/task/${data._id}`} className="task-link">
                    <Typography gutterBottom variant="headline" component="h2" className="task-title">
                      {data.title}
                    </Typography>
                  </Link>
                  <Typography component="p">
                    {data.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <FormControl className="task-status">
                    <Select
                      value={taskStatus}
                      onChange={this.handleChange}
                      displayEmpty
                      name="task_status"
                      className="task-status-select"
                    >
                      {this.renderTaskStatuses()}
                    </Select>
                  </FormControl>
                </CardActions>
              </div>
            )
            : <TaskForm formAction="edit" initialValues={data} onSubmit={this.handleSubmit} />
        }
        { isSuperuser
          ? (
            <div className="task-container-btn">
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => this.setState({ edit: !edit })}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => deleteTask(data._id)}
              >
                Delete
              </Button>
            </div>
          ) : false}
      </Card>
    );
  }
}

TaskCard.propTypes = {
  data: PropTypes.object.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};


export default TaskCard;
