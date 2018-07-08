import { userConstants } from '../_constants';

const user = JSON.parse(localStorage.getItem('access_token'));
const initialState = {
  isLoggedIn: !!user,
  loggingIn: false,
  user: {
    isSuperuser: false,
  },
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.SIGN_UP_REQUEST:
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case userConstants.SIGN_UP_SUCCESS:
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loggingIn: false,
      };
    case userConstants.SIGN_UP_FAILURE:
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        isLoggedIn: false,
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        loggingIn: false,
      };
    case userConstants.GET_USER_REQUEST:
      return {
        ...state,
        isFetchingUser: true,
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isFetchingUser: false,
        user: action.payload,
      };
    case userConstants.GET_USER_FAILURE:
      return {
        ...state,
        isFetchingUser: false,
        getUserError: action.payload,
        user: null,
      };
    case userConstants.EDIT_USER_PROFILE_REQUEST:
      return {
        ...state,
        isFetchingEditUserProfile: true,
      };
    case userConstants.EDIT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isFetchingEditUserProfile: false,
        user: action.payload,
      };
    case userConstants.EDIT_USER_PROFILE_FAILURE:
      return {
        ...state,
        isFetchingEditUserProfile: false,
        editProfileError: action.payload,
      };
    default:
      return state;
  }
}
