import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/app';
import rootReducer from './_reducers';
import { userActions } from './_actions/actions_user';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const accessToken = JSON.parse(localStorage.getItem('access_token'));

if (accessToken) {
  store.dispatch(userActions.getUser());
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
