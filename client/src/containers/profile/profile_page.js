import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import './profile_page.css';
import PropTypes from 'prop-types';
import { userActions } from '../../_actions/actions_user';

import ProfileInfo from '../../components/profile/profile_info';
import ProfileForm from '../../components/profile/profile_edit_form';

const styles = {
  bigAvatar: {
    width: 160,
    height: 160,
  },
};

const pageToggle = {
  edit: 'edit',
  info: 'info',
};

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: pageToggle.info,
    };

    this.onEdit = this.onEdit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  toggleComponents() {
    const { user } = this.props;
    const { page } = this.state;
    if (page === pageToggle.info) {
      return <ProfileInfo handleEdit={this.onEdit} user={user} />;
    }
    return <ProfileForm handleCancel={this.onCancel} onSubmit={this.onSave} user={user} />;
  }

  onEdit() {
    this.setState({ page: pageToggle.edit });
  }

  onCancel() {
    this.setState({ page: pageToggle.info });
  }

  onSave(values) {
    this.setState({ page: pageToggle.info });
    const { user, onSubmitProfileForm } = this.props;
    onSubmitProfileForm(user._id, values);
  }

  render() {
    const { user, isFetchingUser } = this.props;
    if (isFetchingUser) {
      return (
        <CircularProgress />
      );
    }
    return (
      <div className="profile-page">
        <Typography variant="display1" gutterBottom>
          Profile
        </Typography>
        <div className="profile-container">
          <div className="profile-left">
            <img src={user.avatar} className="user-avatar" alt="user avatar" />
          </div>
          <div className="profile-right">
            {this.toggleComponents()}
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  onSubmitProfileForm: PropTypes.func.isRequired,
  isFetchingUser: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isFetchingUser: state.auth.isFetchingUser,
});

const mapDispatchToProps = dispatch => ({
  onSubmitProfileForm: (userId, newProfile) => {
    dispatch(userActions.editUserProfile(userId, newProfile));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProfilePage));
