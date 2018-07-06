import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './auth.css';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import AuthForm from './auth.form';

import { userActions } from '../../_actions/actions_user';

class RegistrationPage extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log(values);
    const { dispatch } = this.props;
    if (values.email && values.password) {
      dispatch(userActions.signUp(values.email, values.password));
    }
  }

  render() {
    return (
      <div className="registration-page">
        <Typography variant="display1" gutterBottom>
          Registration on the site
        </Typography>
        <Paper className="registration-page-form">
          <AuthForm onSubmit={this.handleSubmit} />
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

function mapStateToProps(state) {
  const { loggingIn } = state.auth;
  return {
    loggingIn,
  };
}

export default connect(mapStateToProps)(RegistrationPage);
