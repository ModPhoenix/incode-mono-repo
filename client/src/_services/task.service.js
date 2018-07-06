import axios from 'axios';
import settings from '../settings';

import { authHeader } from '../_helpers';

export const taskService = {
  editTask,
  deleteTask,
};

axios.defaults.baseURL = settings.domain;

function editTask(taskId, task) {
  const request = axios.create({
    headers: authHeader(),
  });

  return request.put(`/task/${taskId}`, {
    ...task,
  });
}

function deleteTask(taskId) {
  const request = axios.create({
    headers: authHeader(),
  });

  return request.delete(`/task/${taskId}`);
}
