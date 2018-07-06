import axios from 'axios';
import { reset } from 'redux-form';

import settings from '../settings';
import { authHeader, history } from '../_helpers';
import { userActions } from './actions_user';
import { taskService } from '../_services';
import { taskConstants } from '../_constants';

export const TASK_ADD = 'TASK_ADD';
export const TASK_ADD_SUCCESS = 'TASK_ADD_SUCCESS';
export const TASK_ADD_FAIL = 'TASK_ADD_FAIL';
export const LOAD_TASKS = 'LOAD_TASK';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASK_SUCCESS';
export const LOAD_TASKS_FAIL = 'LOAD_TASK_FAIL';
export const CHANGED_TASK_STATUS = 'CHANGED_TASK_STATUS';
export const LOAD_TASK_DETAIL = 'LOAD_TASK_DETAIL';


export function taskAdd() {
  return { type: TASK_ADD };
}

export function taskAddSuccess(payload) {
  return { type: TASK_ADD_SUCCESS, payload };
}

export function taskAddFail(error) {
  return { type: TASK_ADD_FAIL, error };
}

export function loadTasks() {
  return { type: LOAD_TASKS };
}

export function loadTasksSuccess(payload) {
  return { type: LOAD_TASKS_SUCCESS, payload };
}

export function loadTasksFail(payload) {
  return { type: LOAD_TASKS_FAIL, payload };
}

export function changedTaskStatus(payload) {
  return { type: CHANGED_TASK_STATUS, payload };
}

export function loadTaskDetail(payload) {
  return { type: LOAD_TASK_DETAIL, payload };
}

axios.defaults.baseURL = settings.domain;

export const sendTask = (title, description) => (dispatch) => {
  dispatch(taskAdd());
  axios.post('/task', {
    title,
    description,
    status: 'To do',
  })
    .then(({ data }) => {
      dispatch(taskAddSuccess(data));
    })
    .catch((error) => {
      dispatch(taskAddFail(error));
    });
};

export const fetchTasks = () => (dispatch) => {
  dispatch(loadTasks());
  axios.defaults.headers = authHeader();
  axios.get('/task')
    .then(({ data }) => {
      dispatch(loadTasksSuccess(data));
    })
    .catch((error) => {
      dispatch(loadTasksFail(error));
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(userActions.logout(error));
      }
    });
};

export const fetchTaskDetail = id => (dispatch) => {
  axios.defaults.headers = authHeader();
  axios.get(`/task/${id}`)
    .then(({ data }) => {
      dispatch(loadTaskDetail(data));
    })
    .catch((error) => {
      dispatch(loadTasksFail(error));
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(userActions.logout(error));
      }
    });
};

export function editTask(taskId, task) {
  return (dispatch, getState) => {
    dispatch(request());

    taskService.editTask(taskId, task)
      .then(
        (res) => {
          const index = getState().tasks.data.findIndex(obj => obj._id === res.data._id);
          dispatch(reset('task_form'));
          dispatch(success(res.data, index));
        },
        (error) => {
          dispatch(failure(error));
          if (error.response.status === 401 || error.response.status === 403) {
            dispatch(userActions.logout(error));
          }
        },
      );
  };

  function request() { return { type: taskConstants.CHANGED_TASK_REQUEST }; }
  function success(payload, index) {
    return { type: taskConstants.CHANGED_TASK_SUCCESS, payload, index };
  }
  function failure(payload) { return { type: taskConstants.CHANGED_TASK_FAILURE, payload }; }
}

export function deleteTask(taskId) {
  return (dispatch, getState) => {
    dispatch(request());

    taskService.deleteTask(taskId)
      .then(
        (res) => {
          if (res.status === 200) {
            const index = getState().tasks.data.findIndex(task => task._id === taskId);
            dispatch(success(index));
            history.push('/');
          }
        },
        (error) => {
          dispatch(failure(error));
          if (error.response.status === 401 || error.response.status === 403) {
            dispatch(userActions.logout(error));
          }
        },
      );
  };

  function request() { return { type: taskConstants.DELETE_TASK_REQUEST }; }
  function success(index) { return { type: taskConstants.DELETE_TASK_SUCCESS, index }; }
  function failure(payload) { return { type: taskConstants.DELETE_TASK_FAILURE, payload }; }
}
