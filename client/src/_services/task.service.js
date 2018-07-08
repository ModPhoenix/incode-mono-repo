import axios from 'axios';

import { authHeader, config } from '../_helpers';

function feachTasks() {
  const request = axios.create({
    headers: authHeader(),
  }, config);

  return request.get('/task');
}

function feachTask(id) {
  const request = axios.create({
    headers: authHeader(),
  }, config);

  return request.get(`/task/${id}`);
}

function addTask(task) {
  const request = axios.create({
    headers: authHeader(),
  }, config);

  return request.post('/task', {
    ...task,
    status: 'To do',
  });
}

function editTask(taskId, task) {
  const request = axios.create({
    headers: authHeader(),
  }, config);

  return request.put(`/task/${taskId}`, {
    ...task,
  });
}

function deleteTask(taskId) {
  const request = axios.create({
    headers: authHeader(),
  }, config);

  return request.delete(`/task/${taskId}`);
}

export const taskService = {
  feachTasks,
  feachTask,
  addTask,
  editTask,
  deleteTask,
};
