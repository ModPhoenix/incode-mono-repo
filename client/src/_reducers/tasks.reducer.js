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
    case taskConstants.FETCH_TASKS_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case taskConstants.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.payload,
      };
    case taskConstants.FETCH_TASKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
      };
    case taskConstants.FETCH_TASK_REQUEST:
      return {
        ...state,
        isFetchingTask: true,
      };
    case taskConstants.FETCH_TASK_SUCCESS:
      return {
        ...state,
        isFetchingTask: false,
        detail: action.payload,
      };
    case taskConstants.FETCH_TASK_FAILURE:
      return {
        ...state,
        isFetchingTask: false,
        isFetchingTaskError: action.payload,
      };
    case taskConstants.ADD_TASK_REQUEST:
      return {
        ...state,
        isTaskSending: true,
        isTaskSendingErr: false,
      };
    case taskConstants.ADD_TASK_SUCCESS:
      return {
        ...state,
        isTaskSending: false,
        data: [...state.data, action.payload],
      };
    case taskConstants.ADD_TASK_FAILURE:
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
