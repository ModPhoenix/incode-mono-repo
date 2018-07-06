import {
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  LOAD_COMMENT_FORM,
} from '../_actions/actions_comments';


const initialState = {
  data: {},
  loaded: false,
  commentForm: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        data: { ...action.payload },
      };
    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        loaded: true,
      };
    case ADD_COMMENT:
      return {
        ...state,
      };
    case EDIT_COMMENT: {
      const allComments = state.data;
      const comments = state.data[action.idTask];
      const comment = comments[action.idComment];
      return {
        ...state,
        data: {
          ...allComments,
          [action.idTask]: {
            ...comments,
            [action.idComment]: {
              ...comment,
              content: action.payload,
            },
          },
        },
      };
    }
    case DELETE_COMMENT:
      return {
        ...state,
        data: state.data.filter(task => task.id !== action.payload),
      };
    case LOAD_COMMENT_FORM:
      return {
        ...state,
        commentForm: action.payload,
      };
    default:
      return state;
  }
}
