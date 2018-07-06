import axios from 'axios';
import settings from '../settings';

import { authHeader } from '../_helpers';

export const userService = {
  signUp,
  login,
  logout,
  getUser,
  editUserProfile,
};

axios.defaults.baseURL = settings.domain;

function signUp(email, password) {
  return axios.post('/auth/register', {
    email,
    password,
  })
    .then(({ data }) => {
      if (data.token) {
        localStorage.setItem('access_token', JSON.stringify(data.token));
      }
    });
}

function login(email, password) {
  return axios.post('/auth/login', {
    email,
    password,
  })
    .then(({ data }) => {
      if (data.token) {
        localStorage.setItem('access_token', JSON.stringify(data.token));
      }
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('access_token');
}


function getUser() {
  const request = axios.create({
    headers: authHeader(),
  });

  return request.get('/auth/me');
}

function editUserProfile(userId, newProfile) {
  const request = axios.create({
    headers: authHeader(),
  });

  return request.put(`/user/${userId}`, {
    ...newProfile,
  });
}

// function handleResponse(error) {
//
//   if (error.response.status === 401 && error.response.status === 403) {
//     logout();
//     document.location.reload(true);
//   }
//
//   return error;
// }
