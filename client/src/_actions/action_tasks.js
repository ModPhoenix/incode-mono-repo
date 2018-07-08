import { reset } from 'redux-form';

import { history } from '../_helpers';
import { userActions } from './actions_user';
import { taskService } from '../_services';
import { taskConstants } from '../_constants';


// export const fetchTaskDetail = id => (dispatch) => {
//   axios.defaults.headers = authHeader();
//   axios.get(`/task/${id}`)
//     .then(({ data }) => {
//       dispatch(loadTaskDetail(data));
//     })
//     .catch((error) => {
//       dispatch(loadTasksFail(error));
//       if (error.response.status === 401 || error.response.status === 403) {
//         dispatch(userActions.logout(error));
//       }
//     });
// };

export function fetchTask(id) {
  function request() { return { type: taskConstants.FETCH_TASK_REQUEST }; }
  function success(payload) { return { type: taskConstants.FETCH_TASK_SUCCESS, payload }; }
  function failure(payload) { return { type: taskConstants.FETCH_TASK_FAILURE, payload }; }

  return (dispatch) => {
    dispatch(request());

    taskService.feachTask(id)
      .then(
        (res) => {
          if (res.status === 200) {
            dispatch(success(res.data));
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
}

export function fetchTasks() {
  function request() { return { type: taskConstants.FETCH_TASKS_REQUEST }; }
  function success(payload) { return { type: taskConstants.FETCH_TASKS_SUCCESS, payload }; }
  function failure(payload) { return { type: taskConstants.FETCH_TASKS_FAILURE, payload }; }

  return (dispatch) => {
    dispatch(request());

    taskService.feachTasks()
      .then(
        (res) => {
          if (res.status === 200) {
            dispatch(success(res.data));
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
}

export function addTask(task) {
  function request() { return { type: taskConstants.ADD_TASK_REQUEST }; }
  function success(payload) { return { type: taskConstants.ADD_TASK_SUCCESS, payload }; }
  function failure(payload) { return { type: taskConstants.ADD_TASK_FAILURE, payload }; }

  return (dispatch) => {
    dispatch(request());

    taskService.addTask(task)
      .then(
        (res) => {
          if (res.status === 200) {
            dispatch(success(res.data));
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
}

export function editTask(taskId, task) {
  function request() { return { type: taskConstants.CHANGED_TASK_REQUEST }; }
  function success(payload, index) {
    return { type: taskConstants.CHANGED_TASK_SUCCESS, payload, index };
  }
  function failure(payload) { return { type: taskConstants.CHANGED_TASK_FAILURE, payload }; }

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
}

export function deleteTask(taskId) {
  function request() { return { type: taskConstants.DELETE_TASK_REQUEST }; }
  function success(index) { return { type: taskConstants.DELETE_TASK_SUCCESS, index }; }
  function failure(payload) { return { type: taskConstants.DELETE_TASK_FAILURE, payload }; }

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
}
