import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import { TextField } from 'redux-form-material-ui';

const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address' : undefined);

let AuthForm = ({ handleSubmit }) => (
  <div className="registration">
    <form onSubmit={handleSubmit} noValidate autoComplete="off" className="task-add-form">
      <Field
        name="email"
        component={TextField}
        type="email"
        label="Email"
        validate={email}
      />
      <Field
        name="password"
        component={TextField}
        type="password"
        label="Password"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="registration-submit-btn"
      >
          Send
      </Button>
    </form>
  </div>
);

AuthForm = reduxForm({
  form: 'registration',
})(AuthForm);

export default AuthForm;
