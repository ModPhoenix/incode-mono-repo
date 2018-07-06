import axios from 'axios';

import { userConstants } from '../_constants/index';
import { userService } from '../_services';
import { alertActions } from './actions_alert';
import { history, authHeader } from '../_helpers/index';
import settings from '../settings';

export const EDIT_USER_PROFILE = 'EDIT_USER_PROFILE';
export const LOAD_INITIAL_FORM = 'LOAD_INITIAL_FORM';

export const userActions = {
  signUp,
  login,
  logout,
  getAll,
  getUser,
  editUserProfile,
};

// export function editUserProfile(payload) {
//   return { type: EDIT_USER_PROFILE, payload };
// }

export function loadInitialForm(payload) {
  return { type: LOAD_INITIAL_FORM, payload };
}

axios.defaults.baseURL = settings.domain;
axios.defaults.headers = authHeader();

function signUp(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.signUp(username, password)
      .then(
        (user) => {
          dispatch(success(user));
          dispatch(getUser());
          history.push('/');
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };

  function request(user) { return { type: userConstants.SIGN_UP_REQUEST, user }; }
  function success(user) { return { type: userConstants.SIGN_UP_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.SIGN_UP_FAILURE, error }; }
}

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        (user) => {
          dispatch(success(user));
          dispatch(getUser());
          history.push('/');
        },
        (error) => {
          dispatch(failure(error));
          // dispatch(alertActions.error(error));
        },
      );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
}

function logout() {
  userService.logout();
  history.push('/login');
  return { type: userConstants.LOGOUT };
}

function getUser() {
  return (dispatch) => {
    dispatch(request());

    userService.getUser()
      .then(
        (res) => {
          dispatch(success(res.data));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };

  function request() { return { type: userConstants.GET_USER_REQUEST }; }
  function success(payload) { return { type: userConstants.GET_USER_SUCCESS, payload }; }
  function failure(payload) { return { type: userConstants.GET_USER_FAILURE, payload }; }
}

function editUserProfile(userId, newProfile) {
  return (dispatch) => {
    dispatch(request());

    userService.editUserProfile(userId, newProfile)
      .then(
        (res) => {
          dispatch(success(res.data));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };

  function request() { return { type: userConstants.EDIT_USER_PROFILE_REQUEST }; }
  function success(payload) { return { type: userConstants.EDIT_USER_PROFILE_SUCCESS, payload }; }
  function failure(payload) { return { type: userConstants.EDIT_USER_PROFILE_FAILURE, payload }; }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error)),
      );
  };

  function request() { return { type: userConstants.GETALL_REQUEST }; }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users }; }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error }; }
}
