import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './auth.css';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import AuthForm from '../../components/auth/auth.form';

import { userActions } from '../../_actions/actions_user';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    props.dispatch(userActions.logout());

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { dispatch } = this.props;
    if (values.email && values.password) {
      dispatch(userActions.login(values.email, values.password));
    }
  }

  render() {
    const { loggingIn } = this.props;

    return (
      <div className="registration-page">
        <Typography variant="display1" gutterBottom>
          Login to the site
        </Typography>
        <Paper className="registration-page-form">
          <AuthForm loggingIn={loggingIn} onSubmit={this.handleSubmit} />
          <div>
            <Link to="/registration" className="auth-link">
              New? Create an account.
            </Link>
          </div>
        </Paper>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { loggingIn } = state.auth;
  return {
    loggingIn,
  };
}

export default connect(mapStateToProps)(LoginPage);
