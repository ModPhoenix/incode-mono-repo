import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './menu.css';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBox from '@material-ui/icons/AccountBox';
import Assignment from '@material-ui/icons/Assignment';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Cached from '@material-ui/icons/Cached';


const RenderAuthLink = (isLoggedIn) => {
  if (isLoggedIn) {
    return (
      <React.Fragment>
        <Link to="/profile" className="nav-link">
          <ListItem button>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText inset primary="Profile" />
          </ListItem>
        </Link>
        <Link to="/login" className="nav-link">
          <ListItem button>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText inset primary="Logout" />
          </ListItem>
        </Link>
      </React.Fragment>
    );
  }

  return (
    <Link to="/login" className="nav-link">
      <ListItem button>
        <ListItemIcon>
          <Cached />
        </ListItemIcon>
        <ListItemText inset primary="Login" />
      </ListItem>
    </Link>
  );
};

const MenuList = ({ isLoggedIn }) => (
  <div>
    <List
      component="nav"
      subheader={(
        <ListSubheader component="div">
            Navigation
        </ListSubheader>
        )}
    >
      <Link to="/" className="nav-link">
        <ListItem button>
          <ListItemIcon>
            <Assignment />
          </ListItemIcon>
          <ListItemText inset primary="Tasks" />
        </ListItem>
      </Link>
      {RenderAuthLink(isLoggedIn)}
    </List>
  </div>
);

MenuList.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(MenuList);
