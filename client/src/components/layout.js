import React from 'react';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import Profile from '../containers/profile/profile_page';
import MenuList from './menu';
import PrivateRoute from './private_route';
import TasksPage from '../containers/tasks/tasks_page';
import TaskDetailPage from '../containers/tasks/task_details_page';
import RegistrationPage from '../containers/auth/registration.page';
import LoginPage from '../containers/auth/login.page';
import NotFoundPage from './404.page';
import styles from './theme';
import { history } from '../_helpers';

const Layout = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <ConnectedRouter history={history}>
        <div className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Simple Task Manager
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <MenuList />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>
              <Switch>
                <PrivateRoute exact path="/" component={TasksPage} />
                <PrivateRoute exact path="/task/:id" component={TaskDetailPage} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <Route exact path="/registration" component={RegistrationPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="*" component={NotFoundPage} />
              </Switch>
            </div>
          </main>
        </div>
      </ConnectedRouter>
    </div>
  );
};

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: false })(Layout);
