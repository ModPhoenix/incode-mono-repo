import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
// import UserReducer from './user.reducer';
import TasksReducer from './tasks.reducer';
import CommentsReducer from './comments.reducer';
import AuthReducer from './auth.reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  // user: UserReducer,
  tasks: TasksReducer,
  comments: CommentsReducer,
  router: routerReducer,
  form: formReducer,
});

export default rootReducer;
