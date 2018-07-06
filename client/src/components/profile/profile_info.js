import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const ProfileInfo = (props) => {
  const { user, handleEdit } = props;
  return (
    <div className="profile-info">
      <Paper className="profile-part" elevation={1}>
        <Typography variant="title" component="h3" className="profile-part-title">
          General info
        </Typography>
        <Typography component="p">
          <span className="field-name">
Full Name:
          </span>
          {' '}
          {user.fullName}
        </Typography>
        <Typography component="p">
          <span className="field-name">
Email:
          </span>
          {' '}
          {user.email}
        </Typography>
        <Typography component="p">
          <span className="field-name">
Date of Birth:
          </span>
          {' '}
          {user.dateOfBirth}
        </Typography>
        <Typography component="p">
          <span className="field-name">
Gender:
          </span>
          {' '}
          {user.gender}
        </Typography>
        <Typography component="p">
          <span className="field-name">
Address:
          </span>
          {' '}
          {user.address}
        </Typography>
        <Typography component="p">
          <span className="field-name">
Phone:
          </span>
          {' '}
          {user.phone}
        </Typography>
      </Paper>
      <Paper className="profile-part" elevation={1}>
        <Typography variant="title" component="h3" className="profile-part-title">
          Technical info
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
      <div className="profile-control-buttons">
        <Button variant="contained" color="primary" className="btn-profile-edit" onClick={() => handleEdit()}>
          Edit
        </Button>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
};


export default ProfileInfo;
