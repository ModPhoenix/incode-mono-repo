import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';

import { RadioGroup, TextField } from 'redux-form-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const renderDatePicker = ({
  input, meta: { touched, error },
}) => (
  <div>
    <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
    {touched && error && (
    <span>
      {error}
    </span>
    )}
  </div>
);

renderDatePicker.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address' : undefined);

let ProfileForm = (props) => {
  const { handleCancel, handleSubmit, user } = props;

  if (user === null) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className="profile-info">
        <Paper className="profile-part" elevation={1}>
          <Typography variant="title" component="h3" className="profile-part-title">
              General info
          </Typography>
          <Typography component="div">
            <span className="field-name">
              Full Name:
            </span>
            <Field name="fullName" component={TextField} type="text" />
          </Typography>
          <Typography component="div">
            <span className="field-name">
              Email:
            </span>
            <Field name="email" validate={email} component={TextField} type="email" />
          </Typography>
          <Typography component="div" className="date-picker-field">
            <span className="field-name">
              Date of Birth:
            </span>
            <Field name="dateOfBirth" component={renderDatePicker} type="text" />
          </Typography>
          <Typography component="div">
            <span className="field-name">
              Gender:
            </span>
            <Field name="gender" aria-label="gender" label="Gender" component={RadioGroup}>
              <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
              <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
            </Field>
          </Typography>
          <Typography component="div">
            <span className="field-name">
              Address:
            </span>
            <Field name="address" component={TextField} type="text" />
          </Typography>
          <Typography component="div">
            <span className="field-name">
              Phone:
            </span>
            <Field name="phone" component={TextField} type="text" />
          </Typography>
        </Paper>
        <Paper className="profile-part" elevation={1}>
          <Typography variant="title" component="h3" className="profile-part-title">
              Technical info
          </Typography>
          <Typography component="div">
              Paper can be used to build surface or other elements for your application.
          </Typography>
        </Paper>
      </div>
      <div className="profile-control-buttons">
        <Button variant="contained" className="btn-profile-cancel" onClick={() => handleCancel()}>
            Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" className="btn-profile-save">
            Save
        </Button>
      </div>
    </form>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

ProfileForm = reduxForm({
  form: 'profile',
})(ProfileForm);

ProfileForm = connect(state => ({
  initialValues: state.auth.user,
}))(ProfileForm);

export default ProfileForm;
