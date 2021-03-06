import React from 'react';
import './app.css';
import { connect } from 'react-redux';

import Layout from './layout';

const classes = {
  root: 'container',
  appBar: 'appBar',
  appBarShift: 'appBarShift',
  menuButton: 'menuButton',
  hide: 'hide',
  drawerPaper: 'drawerPaper',
  drawerPaperClose: 'drawerPaperClose',
  toolbar: 'toolbar',
  content: 'content',
};

const theme = {
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    mobileStepper: 1000,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  transitions: {
    duration: 32,
    easing: {},
    getAutoHeightDuration: [],
  },
};

const App = () => (
  <div className="App">
    <Layout classes={classes} theme={theme} />
  </div>
);

export default connect()(App);
