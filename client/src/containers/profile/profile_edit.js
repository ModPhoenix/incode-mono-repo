import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaterialUiForm from '../../components/profile/profile_edit_form';
import { editUserProfile } from '../../_actions/actions_user';
import './profile_edit.css';

class ProfileEdit extends Component {
  submit(values) {
    const { onSubmitProfileForm } = this.props;
    onSubmitProfileForm(values);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="profile-edit">
        <MaterialUiForm onSubmit={this.submit} user={user} />
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmitProfileForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onSubmitProfileForm: (pfofile) => {
    dispatch(editUserProfile(pfofile));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileEdit);
