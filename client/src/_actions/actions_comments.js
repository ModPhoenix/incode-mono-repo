import axios from 'axios';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const LOAD_COMMENT_FORM = 'LOAD_COMMENT_FORM';

export function loadComments(payload) {
  return { type: LOAD_COMMENTS, payload };
}

export function loadCommentsSuccess() {
  return { type: LOAD_COMMENTS_SUCCESS };
}

export function addComment(idTask, idComment, payload) {
  return { type: ADD_COMMENT, payload };
}

export function editeComment(idTask, idComment, payload) {
  return {
    type: EDIT_COMMENT, idTask, idComment, payload,
  };
}

export function deleteComment(payload) {
  return { type: DELETE_COMMENT, payload };
}

export function loadCommentForm(payload) {
  return { type: LOAD_COMMENT_FORM, payload };
}

export const fetchComments = () => {
  const request = axios.get('/mock-data/comments.json');
  return (dispatch) => {
    request.then(({ data }) => {
      dispatch(loadComments(data));
      dispatch(loadCommentsSuccess());
    });
  };
};
