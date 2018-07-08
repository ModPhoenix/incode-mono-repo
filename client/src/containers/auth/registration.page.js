import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './auth.css';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import AuthForm from '../../components/auth/auth.form';

import { userActions } from '../../_actions/actions_user';

class RegistrationPage extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { dispatch } = this.props;
    if (values.email && values.password) {
      dispatch(userActions.signUp(values.email, values.password));
    }
  }

  render() {
    const { loggingIn } = this.props;

    return (
      <div className="registration-page">
        <Typography variant="display1" gutterBottom>
          Registration on the site
        </Typography>
        <Paper className="registration-page-form">
          <AuthForm loggingIn={loggingIn} onSubmit={this.handleSubmit} />
          <div>
            <Link to="/login" className="auth-link">
Have an account? Sign in now.
            </Link>
          </div>
        </Paper>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { loggingIn } = state.auth;
  return {
    loggingIn,
  };
}

export default connect(mapStateToProps)(RegistrationPage);
