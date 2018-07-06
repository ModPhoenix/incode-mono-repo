import {
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAIL,
  LOAD_TASK_DETAIL,
  TASK_ADD,
  TASK_ADD_SUCCESS,
  TASK_ADD_FAIL,
} from '../_actions/action_tasks';

import { taskConstants } from '../_constants';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  isTaskSending: false,
  isFetchingEditTask: false,
  isTaskSendingErr: false,
  isFetchingDeleteTask: false,
  data: [],
  detail: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TASKS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case LOAD_TASKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.payload,
      };
    case LOAD_TASKS_FAIL:
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
      };
    case LOAD_TASK_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case TASK_ADD:
      return {
        ...state,
        isTaskSending: true,
        isTaskSendingErr: false,
      };
    case TASK_ADD_SUCCESS:
      return {
        ...state,
        isTaskSending: false,
        isTaskSendingErr: false,
        data: [action.payload, ...state.data],
      };
    case TASK_ADD_FAIL:
      return {
        ...state,
        isTaskSending: false,
        isTaskSendingErr: true,
      };
    case taskConstants.CHANGED_TASK_REQUEST:
      return {
        ...state,
        isFetchingEditTask: true,
      };
    case taskConstants.CHANGED_TASK_SUCCESS:
      return {
        ...state,
        isFetchingEditTask: false,
        data: [
          ...state.data.slice(0, action.index),
          action.payload,
          ...state.data.slice(action.index + 1),
        ],
        detail: { ...action.payload },
      };
    case taskConstants.CHANGED_TASK_FAILURE:
      return {
        ...state,
        isFetchingEditTask: false,
        errorFetchingEditTask: action.payload,
      };
    case taskConstants.DELETE_TASK_REQUEST:
      return {
        ...state,
        isFetchingDeleteTask: true,
      };
    case taskConstants.DELETE_TASK_SUCCESS:
      return {
        ...state,
        isFetchingDeleteTask: false,
        data: [
          ...state.data.slice(0, action.index),
          ...state.data.slice(action.index + 1),
        ],
      };
    case taskConstants.DELETE_TASK_FAILURE:
      return {
        ...state,
        isFetchingDeleteTask: false,
      };
    default:
      return state;
  }
}
