import { userConstants } from '../_constants';

const initialState = {
  currentUser: null,
  loginIn: false,
  user: {
    isSuperuser: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.EDIT_USER_PROFILE_REQUEST:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userConstants.EDIT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loginIn: true,
      };
    case userConstants.EDIT_USER_PROFILE_FAILURE:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
